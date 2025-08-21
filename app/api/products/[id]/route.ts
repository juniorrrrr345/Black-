import { NextRequest, NextResponse } from 'next/server';
import dbConnect, { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { ObjectId } from 'mongodb';

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
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // D'abord essayer de charger depuis les produits statiques
    const { products } = await import('@/lib/products');
    const staticProduct = products.find(p => p.id === id);
    
    if (staticProduct) {
      return NextResponse.json(staticProduct);
    }
    
    // Si pas trouvé dans les produits statiques, essayer MongoDB
    try {
      const { db } = await connectToDatabase();
      
      // Vérifier si c'est un ObjectId valide
      if (ObjectId.isValid(id)) {
        const product = await db
          .collection('products')
          .findOne({ _id: new ObjectId(id) });
        
        if (product) {
          return NextResponse.json(product);
        }
      }
      
      // Essayer aussi de chercher par id string
      const productById = await db
        .collection('products')
        .findOne({ id: id });
      
      if (productById) {
        return NextResponse.json(productById);
      }
    } catch (dbError) {
      console.log('Database error, using static products only:', dbError);
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