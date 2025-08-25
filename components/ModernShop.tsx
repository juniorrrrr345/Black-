'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ModernShop() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page des produits
    router.push('/products');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Boutique APU</h1>
        <p className="text-gray-400">Redirection vers les produits...</p>
      </div>
    </div>
  );
}