'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ item }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  };

  return (
    <Link href={`/producto/${item.id}`} className="group flex flex-col bg-ivory rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-cream-dark">
      {/* Product Image Wrapper */}
      <div className="relative aspect-[4/5] bg-cream rounded-t-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        
        {/* In Stock vs Bajo Pedido Badge */}
        <div className="absolute top-3 left-3 z-10">
          {item.inStock ? (
            <span className="bg-cream/90 backdrop-blur text-charcoal text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
              Disponible
            </span>
          ) : (
            <span className="badge-bajo-pedido bg-terracotta text-cream text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full relative"></span>
              Bajo Pedido
            </span>
          )}
        </div>

        {/* Quick Add Button (+) */}
        <button 
          onClick={handleQuickAdd}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-ivory/90 hover:bg-gold text-charcoal hover:text-white shadow-md flex items-center justify-center transition-all duration-300 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          title="Añadir al carrito"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* View Details Button (Hover Overlay) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <div className="bg-cream border border-gold/30 text-charcoal text-center text-sm font-semibold py-2 rounded-lg hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors shadow-lg">
            Ver Detalles
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-terracotta transition-colors leading-snug mb-2">
          {item.title}
        </h3>
        <span className="text-terracotta font-semibold tracking-wide mt-auto text-lg">
          {item.price}
        </span>
      </div>
    </Link>
  );
}
