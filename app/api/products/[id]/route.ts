import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    try {
      await dbConnect();
      
      // Essayer de mettre à jour dans MongoDB
      let product = null;
      
      // Si l'ID ressemble à un ObjectId MongoDB
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        product = await Product.findByIdAndUpdate(id, body, { 
          new: true, 
          runValidators: true 
        });
      }
      
      // Si pas trouvé, essayer par id string
      if (!product) {
        product = await Product.findOneAndUpdate(
          { id: id }, 
          body, 
          { new: true, runValidators: true }
        );
      }
      
      if (product) {
        // Invalider le cache
        const { cacheHelpers } = await import('@/lib/cache');
        cacheHelpers.invalidateProducts();
        
        return NextResponse.json(product);
      }
      
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    } catch (dbError) {
      // Si MongoDB n'est pas disponible, mettre à jour dans le cache local
      console.log('MongoDB not available, updating in local cache');
      
      const { cacheHelpers } = await import('@/lib/cache');
      const cachedProducts = cacheHelpers.getProducts();
      let products: any[] = Array.isArray(cachedProducts) ? cachedProducts : [];
      
      if (products.length === 0) {
        const { products: staticProducts } = await import('@/lib/products');
        products = staticProducts.map(p => ({ 
          ...p, 
          _id: p.id,
          quantity: p.stock || 50,
          available: true 
        }));
      }
      
      const productIndex = products.findIndex((p: any) => 
        p._id === id || p.id === id
      );
      
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...body,
          updatedAt: new Date().toISOString()
        };
        cacheHelpers.setProducts(products);
        return NextResponse.json(products[productIndex]);
      }
      
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    try {
      await dbConnect();
      
      // Essayer de supprimer dans MongoDB
      let product = null;
      
      // Si l'ID ressemble à un ObjectId MongoDB
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        product = await Product.findByIdAndDelete(id);
      }
      
      // Si pas trouvé, essayer par id string
      if (!product) {
        product = await Product.findOneAndDelete({ id: id });
      }
      
      if (product) {
        // Invalider le cache
        const { cacheHelpers } = await import('@/lib/cache');
        cacheHelpers.invalidateProducts();
        
        return NextResponse.json({ message: 'Product deleted successfully' });
      }
      
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    } catch (dbError) {
      // Si MongoDB n'est pas disponible, supprimer du cache local
      console.log('MongoDB not available, deleting from local cache');
      
      const { cacheHelpers } = await import('@/lib/cache');
      const cachedProducts = cacheHelpers.getProducts();
      let products: any[] = Array.isArray(cachedProducts) ? cachedProducts : [];
      
      if (products.length === 0) {
        const { products: staticProducts } = await import('@/lib/products');
        products = staticProducts.map(p => ({ 
          ...p, 
          _id: p.id,
          quantity: p.stock || 50,
          available: true 
        }));
      }
      
      const filteredProducts = products.filter((p: any) => 
        p._id !== id && p.id !== id
      );
      
      if (filteredProducts.length < products.length) {
        cacheHelpers.setProducts(filteredProducts);
        return NextResponse.json({ message: 'Product deleted successfully' });
      }
      
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
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