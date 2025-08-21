import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { cacheHelpers } from '@/lib/cache';

export async function GET() {
  try {
    // Try to get from cache first
    const cachedProducts = cacheHelpers.getProducts();
    if (cachedProducts) {
      return NextResponse.json(cachedProducts);
    }

    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    // Cache the results
    cacheHelpers.setProducts(products);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Create the product
    const product = await Product.create(body);
    
    // Invalidate cache and sync
    cacheHelpers.invalidateProducts();
    
    // Trigger sync for real-time updates
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'products',
          action: 'create',
          data: product
        })
      });
    } catch (syncError) {
      console.warn('Sync failed:', syncError);
    }
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}