'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

import { getProductById } from '@/lib/data';

export default function ProductDetail({ params }) {
  // En Next.js 15, los params no administrados por promesas en Cliente se pueden obtener a través de React.use, o simplificadamente aquí
  // Como estamos en un 'use client', lo mejor es extraer el id de React.use(params)
  const React = require('react');
  const resolvedParams = React.use(params);
  
  const product = getProductById(resolvedParams.id);
  
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      isOrder: !product.inStock
    });
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-heading text-2xl text-terracotta">Producto no encontrado</div>;
  }

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Breadcrumbs ─── */}
        <nav className="flex items-center gap-2 text-sm text-warm-gray mb-10">
          <Link href="/" className="hover:text-terracotta transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={`/categoria/${product.categoryId}`} className="hover:text-terracotta transition-colors">{product.categoryName}</Link>
          <span>/</span>
          <span className="text-charcoal-light font-medium truncate">{product.title}</span>
        </nav>

        {/* ─── Product Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="product-image-wrapper aspect-[4/5] bg-cream-dark relative flex items-center justify-center p-8 group">
               {/* Etiqueta de estado dinámica */}
               <div className="absolute top-6 left-6 z-20">
                 {product.inStock ? (
                   <span className="bg-charcoal text-cream text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                     En Stock
                   </span>
                 ) : (
                   <span className="badge-bajo-pedido bg-terracotta text-cream text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md inline-flex items-center gap-2">
                     <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>
                     <span className="w-1.5 h-1.5 bg-white rounded-full relative"></span>
                     Bajo Pedido
                   </span>
                 )}
               </div>

              {/* Main product image */}
              <div 
                className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${product.image})` }}
                aria-label={product.title}
              />
            </div>
            
            {/* Thumbnails (Simulados) */}
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square rounded-lg bg-cream-dark border border-gold/10 hover:border-gold/50 cursor-pointer overflow-hidden relative opacity-70 hover:opacity-100 transition-all duration-300">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})`, opacity: i===1?1:0.5 }} />
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col justify-start pt-6">
            <div className="mb-2">
              <span className="text-warm-gray text-sm uppercase tracking-widest font-semibold">{product.categoryName}</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-4 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-3xl text-terracotta font-medium mb-8">
              {product.price}
            </p>

            <div className="h-px bg-gold/20 w-full mb-8"></div>

            <p className="text-charcoal-light leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            {/* Listado de características */}
            <ul className="mb-10 space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-charcoal-light">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Opciones (Size/Color) si aplicara - Simulado */}
            {product.categoryId === 'calzado' && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-charcoal">Talla europea</span>
                  <a href="#" className="text-sm text-terracotta underline hover:text-terracotta-dark transition-colors">Guía de tallas</a>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['36', '37', '38', '39', '40'].map(size => (
                    <button key={size} className="w-12 h-12 rounded-lg border border-gold/30 flex items-center justify-center text-charcoal hover:border-terracotta hover:text-terracotta hover:bg-terracotta/5 transition-all text-sm font-medium">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notice for "Bajo Pedido" */}
            {!product.inStock && (
              <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-5 mb-8 flex gap-4 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-terracotta flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-medium text-charcoal mb-1">Producto bajo pedido</h4>
                  <p className="text-sm text-charcoal-light">Este artículo se confeccionará especialmente para ti. Tiempo estimado: <span className="font-medium">2-3 semanas de fabricación</span>.</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-3 group text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span>{product.inStock ? 'Añadir al carrito' : 'Solicitar bajo pedido'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
