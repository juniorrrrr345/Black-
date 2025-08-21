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
    // Retourner les produits statiques si MongoDB n'est pas disponible
    try {
      const { products: staticProducts } = await import('@/lib/products');
      return NextResponse.json(staticProducts.map(p => ({ 
        ...p, 
        _id: p.id,
        quantity: p.stock || 50,
        available: true 
      })));
    } catch (staticError) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    try {
      await dbConnect();
      // Create the product in MongoDB
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
    } catch (dbError) {
      // Si MongoDB n'est pas disponible, sauvegarder dans le cache local
      console.log('MongoDB not available, saving to local cache');
      
      // Générer un ID unique
      const newProduct = {
        ...body,
        _id: Date.now().toString(),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Récupérer les produits existants du cache ou des produits statiques
      const cachedProducts = cacheHelpers.getProducts();
      let existingProducts: any[] = Array.isArray(cachedProducts) ? cachedProducts : [];
      if (existingProducts.length === 0) {
        try {
          const { products: staticProducts } = await import('@/lib/products');
          existingProducts = staticProducts.map(p => ({ 
            ...p, 
            _id: p.id,
            quantity: p.stock || 50,
            available: true 
          }));
        } catch (e) {}
      }
      
      // Ajouter le nouveau produit
      const updatedProducts = [newProduct, ...existingProducts];
      cacheHelpers.setProducts(updatedProducts);
      
      return NextResponse.json(newProduct, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}