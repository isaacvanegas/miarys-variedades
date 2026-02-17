import React, { useState } from 'react';
import { Product } from '../types';
import { generateWhatsAppLink, getOptimizedImageUrl } from '../services/productService';
import { SHOP_CONFIG } from '../constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!product) return null;

  const whatsappLink = generateWhatsAppLink(product);
  const images = product.fotos.length > 0 ? product.fotos : ['https://via.placeholder.com/600'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 md:hidden bg-white/50 p-2 rounded-full backdrop-blur-md"
        >
          <span className="material-symbols-outlined text-slate-900">close</span>
        </button>

        {/* Gallery Section */}
        <div className="w-full md:w-1/2 bg-slate-100 relative group min-h-[300px] md:h-auto">
          <img 
            src={getOptimizedImageUrl(images[currentImageIdx])} 
            alt={product.nombre} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(prev => prev === 0 ? images.length - 1 : prev - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setCurrentImageIdx(prev => prev === images.length - 1 ? 0 : prev + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white w-4' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
             <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">
                  {product.categorias.join(', ')}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{product.nombre}</h2>
             </div>
             <button onClick={onClose} className="hidden md:block p-1 hover:bg-slate-100 rounded-full">
               <span className="material-symbols-outlined text-slate-400">close</span>
             </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(product.etiquetas).map(([key, value]) => (
              <span key={key} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-100">
                {key}: {value}
              </span>
            ))}
            {product.estado === 'agotado' && (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold">Agotado</span>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm text-slate-500 mb-8 flex-grow">
            <p>{product.descripcion}</p>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto border-t border-slate-100 pt-6">
            <div className="flex items-end justify-between mb-4">
               <div>
                 <p className="text-sm text-slate-400 mb-1">Precio Total</p>
                 {product.mostrar_precio ? (
                   <span className="text-3xl font-black text-slate-900">
                     {SHOP_CONFIG.CURRENCY_SYMBOL}{product.precio.toFixed(2)}
                   </span>
                 ) : (
                   <span className="text-xl font-bold text-slate-400">Consultar al DM</span>
                 )}
               </div>
               <div className="flex gap-1 text-red-500">
                 <span className="material-symbols-outlined filled">favorite</span>
                 <span className="font-bold">{product.likes}</span>
               </div>
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                product.estado === 'agotado' 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">chat</span>
              {product.mostrar_precio ? 'Comprar por WhatsApp' : 'Consultar Precio'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
