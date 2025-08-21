'use client';

import { Instagram, Send, MessageCircle, Mail, Phone, MapPin, Clock, Shield, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-white text-white">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">À PROPOS</h3>
            <p className="text-gray-300 mb-4">
              Votre boutique de confiance pour des produits de qualité premium. 
              Service client exceptionnel et livraison rapide garantie.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Send size={24} />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">LIENS RAPIDES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">CONTACT</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone size={18} />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail size={18} />
                <span>contact@boutique.fr</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MapPin size={18} />
                <span>Paris, France</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Clock size={18} />
                <span>24/7 Service Client</span>
              </li>
            </ul>
          </div>

          {/* Avantages */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">NOS AVANTAGES</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Shield size={18} />
                <span>Paiement Sécurisé</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Truck size={18} />
                <span>Livraison Express</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MessageCircle size={18} />
                <span>Support 24/7</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Shield size={18} />
                <span>Garantie Qualité</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Ma Boutique. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}