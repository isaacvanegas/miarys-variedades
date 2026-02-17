import React, { useState } from 'react';
import { Product } from '../types';
import { getOptimizedImageUrl, toggleProductLike } from '../services/productService';
import { SHOP_CONFIG } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [likes, setLikes] = useState(product.likes);
  const [isLiked, setIsLiked] = useState(false);

  // If no photos, try to render a placeholder. 
  // If video exists but no photo, getOptimizedImageUrl handles the placeholder.
  const imageUrl = getOptimizedImageUrl(product.fotos && product.fotos.length > 0 ? product.fotos[0] : undefined);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents opening modal
    setIsLiked(true);
    const newLikes = await toggleProductLike(product.id);
    setLikes(newLikes);
  };

  return (
    <div 
      onClick={() => onClick(product)}
      className="break-inside-avoid mb-6 group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-slate-100">
        
        {/* Status Badge */}
        {product.estado === 'agotado' && (
           <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
             Sold Out
           </div>
        )}

        {/* Video Indicator Badge if video exists */}
        {product.link_video && (
           <div className="absolute top-3 right-3 z-10 bg-red-600/90 backdrop-blur-md text-white px-2 py-1 rounded-lg flex items-center gap-1">
             <span className="material-symbols-outlined text-[14px]">play_circle</span>
           </div>
        )}

        {/* Image */}
        <div className="relative bg-slate-100">
            <img 
            src={imageUrl} 
            alt={product.nombre} 
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 min-h-[200px]"
            loading="lazy"
            onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x600/f1f5f9/94a3b8?text=Sin+Imagen';
            }}
            />
            {/* Gradient Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Hover Info (Overlay) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-end">
             <div className="text-white">
                <p className="font-bold text-sm truncate w-40">{product.nombre}</p>
                <p className="text-xs opacity-90">Ver detalles</p>
             </div>
             <button className="bg-white text-slate-900 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
             </button>
        </div>
      </div>

      {/* Info Below (Pinterest Style) */}
      <div className="mt-3 px-1 flex justify-between items-start">
        <div>
          <h3 className="font-bold text-slate-800 text-sm leading-snug mb-0.5">{product.nombre}</h3>
          {product.mostrar_precio ? (
            <p className="text-slate-500 text-xs font-semibold">
              {SHOP_CONFIG.CURRENCY_SYMBOL}{product.precio.toFixed(2)}
            </p>
          ) : (
            <p className="text-slate-400 text-[10px] font-medium">Consultar</p>
          )}
        </div>
        <button 
            onClick={handleLike}
            className={`transition-colors flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
        >
             <span className={`material-symbols-outlined text-[18px] ${isLiked ? 'filled' : ''}`}>favorite</span>
             <span className="text-xs font-medium text-slate-400">{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
