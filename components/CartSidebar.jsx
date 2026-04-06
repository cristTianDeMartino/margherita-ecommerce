'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Fondo oscuro overlay */}
      <div 
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[60] transition-opacity duration-300" 
        onClick={closeCart}
      />
      
      {/* Barra lateral */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-cream z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Cabecera */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <h2 className="font-heading text-2xl font-semibold text-terracotta tracking-wider uppercase">Tu Carrito</h2>
          <button 
            onClick={closeCart}
            className="p-2 -mr-2 text-charcoal-light hover:text-terracotta hover:bg-terracotta/10 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-warm-gray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-charcoal-light text-lg">Tu carrito está vacío</p>
              <button onClick={closeCart} className="mt-4 text-terracotta underline font-medium">Volver a la tienda</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gold/10 pb-6">
                <div 
                  className="w-20 h-24 bg-cream-dark rounded-lg flex-shrink-0 bg-contain bg-center bg-no-repeat" 
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-charcoal font-semibold text-sm leading-tight pr-4">{item.title}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-warm-gray hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    {item.isOrder && <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">Bajo Pedido</span>}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    {/* Control de cantidad */}
                    <div className="flex items-center border border-gold/30 rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-charcoal hover:bg-gold/10"
                      >-</button>
                      <span className="px-2 text-sm text-charcoal font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-charcoal hover:bg-gold/10"
                      >+</button>
                    </div>
                    <span className="font-medium text-terracotta">{item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer del Carrito */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gold/20 bg-cream-dark/50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-charcoal-light font-medium">Subtotal</span>
              <span className="text-xl font-semibold text-terracotta">${cartTotal.toFixed(2)}</span>
            </div>
            
            <Link href="/checkout" onClick={closeCart} className="w-full btn-primary flex justify-center py-3">
              Finalizar Pedido
            </Link>
            <p className="text-center text-xs text-warm-gray mt-4">
              Impuestos y envío calculados en el siguiente paso.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
