import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

// Catégories par défaut
const defaultCategories = [
  { _id: '1', name: 'WEED', slug: 'weed', icon: '🌿', order: 1 },
  { _id: '2', name: 'HASH', slug: 'hash', icon: '🍫', order: 2 }
];

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ order: 1 });
    
    // Si pas de catégories dans MongoDB, retourner les catégories par défaut
    if (categories.length === 0) {
      return NextResponse.json(defaultCategories);
    }
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // En cas d'erreur MongoDB, retourner les catégories par défaut
    return NextResponse.json(defaultCategories);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // S'assurer que l'ordre est défini
    if (!body.order) {
      body.order = 1;
    }
    
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}