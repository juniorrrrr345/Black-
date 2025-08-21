import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // D'abord essayer de charger depuis les produits statiques
    const { products } = await import('@/lib/products');
    const staticProduct = products.find(p => p.id === id);
    
    if (staticProduct) {
      return NextResponse.json(staticProduct);
    }
    
    // Si pas trouvé dans les produits statiques, essayer MongoDB avec Mongoose
    try {
      await dbConnect();
      
      // Essayer de trouver par _id MongoDB ou par id string
      let product = null;
      
      // Si l'ID ressemble à un ObjectId MongoDB (24 caractères hex)
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        product = await Product.findById(id);
      }
      
      // Si pas trouvé, essayer par id string
      if (!product) {
        product = await Product.findOne({ id: id });
      }
      
      if (product) {
        return NextResponse.json(product);
      }
    } catch (dbError) {
      console.log('Database error, product not found:', dbError);
    }
    
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}