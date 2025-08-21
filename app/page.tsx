export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center text-white mb-8">
          VERSHASH
        </h1>
        <p className="text-center text-gray-300 text-xl mb-12">
          Boutique Premium - Qualité Exceptionnelle
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Exemple de produits */}
          <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-white mb-2">Cali Spain</h3>
            <p className="text-gray-400 mb-4">Espagne 🇪🇸</p>
            <p className="text-2xl font-bold text-purple-400">45€</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-white mb-2">Lemon Cherry</h3>
            <p className="text-gray-400 mb-4">Canada 🇨🇦</p>
            <p className="text-2xl font-bold text-purple-400">65€</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
            <div className="text-4xl mb-4">🍫</div>
            <h3 className="text-xl font-bold text-white mb-2">Moroccan Hash</h3>
            <p className="text-gray-400 mb-4">Maroc 🇲🇦</p>
            <p className="text-2xl font-bold text-purple-400">35€</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/admin" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Accès Admin
          </a>
        </div>
      </div>
    </main>
  );
}