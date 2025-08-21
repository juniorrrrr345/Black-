import ShopPage from '@/components/ShopPage';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Settings from '@/models/Settings';

async function getShopData() {
  try {
    await dbConnect();
    
    // Get settings
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({
        shopName: 'VERSHASH',
        bannerText: 'NOUVEAU DROP',
        bannerImage: '/banner-default.jpg'
      });
    }
    
    // Get categories
    const categories = await Category.find({ active: true })
      .sort({ order: 1 })
      .lean();
    
    // Get products
    const products = await Product.find({ available: true })
      .sort({ createdAt: -1 })
      .lean();
    
    return {
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (error) {
    console.error('Error fetching shop data:', error);
    return {
      settings: { shopName: 'VERSHASH', bannerText: 'NOUVEAU DROP', bannerImage: '' },
      categories: [],
      products: [],
    };
  }
}

export default async function Home() {
  const { settings, categories, products } = await getShopData();
  
  return <ShopPage settings={settings} categories={categories} products={products} />;
}