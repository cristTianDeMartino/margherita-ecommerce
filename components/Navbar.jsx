'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

const categories = [
  { name: 'Calzado', href: '/categoria/calzado' },
  { name: 'Mandalas & Arte', href: '/categoria/mandalas' },
  { name: 'Marroquinería', href: '/categoria/marroquineria' },
  { name: 'Lámparas', href: '/categoria/lamparas' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { data: session } = useSession();

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-50 bg-cream/80 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-10 flex items-center justify-center relative overflow-hidden group-hover:rotate-12 transition-transform duration-500">
               {/* Daisy Flower SVG */}
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm">
                 {/* Petals */}
                 <g fill="#FFFFFF" stroke="#EAE5BE" strokeWidth="1">
                   {[...Array(12)].map((_, i) => (
                     <ellipse key={i} cx="50" cy="20" rx="6" ry="18" transform={`rotate(${i * 30} 50 50)`} />
                   ))}
                 </g>
                 {/* Center */}
                 <circle cx="50" cy="50" r="12" fill="#E6AD26" />
                 {/* Center texture/dots */}
                 <circle cx="48" cy="48" r="1.5" fill="#C9961F" />
                 <circle cx="52" cy="52" r="1.5" fill="#C9961F" />
                 <circle cx="53" cy="47" r="1.5" fill="#C9961F" />
                 <circle cx="47" cy="53" r="1.5" fill="#C9961F" />
                 <circle cx="50" cy="50" r="1.5" fill="#C9961F" />
               </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-end gap-1.5 leading-none mb-1">
                <span className="font-heading text-2xl font-bold text-terracotta tracking-wider uppercase">
                  Margherita
                </span>
                <span className="font-heading text-xl font-bold text-terracotta tracking-widest uppercase">
                  Ricci
                </span>
              </div>
              <span className="block text-xs font-heading font-medium text-charcoal italic tracking-[0.1em]">
                Boutique Italian Design
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="nav-link text-sm font-medium text-charcoal-light hover:text-terracotta transition-colors duration-300 tracking-wide uppercase"
              >
                {cat.name}
              </Link>
            ))}
            {/* Auth Button Desktop */}
            {session ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gold/30">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cream-dark text-terracotta font-bold text-xs border border-terracotta/20 shadow-inner">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button 
                  onClick={() => signOut()}
                  className="text-xs font-semibold text-charcoal bg-transparent hover:bg-red-50 border border-charcoal/10 hover:border-red-200 hover:text-red-600 px-3 py-1.5 rounded-full transition-all duration-300 uppercase tracking-widest"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-4 text-xs font-semibold text-cream bg-terracotta hover:bg-terracotta-dark px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-widest shadow-sm hover:shadow-md"
              >
                Iniciar sesión
              </Link>
            )}
          </nav>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <button
              id="cart-button"
              className="relative p-2 rounded-xl hover:bg-cream-dark transition-colors duration-200"
              aria-label="Carrito de compras"
              onClick={openCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {/* Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 rounded-xl hover:bg-cream-dark transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menú"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 pb-6 pt-2 flex flex-col gap-3 bg-cream/95 border-t border-gold/10">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="py-3 px-4 rounded-xl text-sm font-medium text-charcoal hover:bg-cream-dark hover:text-terracotta transition-all duration-200 tracking-wide uppercase"
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          {/* Auth Button Mobile */}
          <div className="h-px bg-gold/20 my-2"></div>
          {session ? (
            <div className="flex items-center justify-between py-2 px-4 rounded-xl hover:bg-red-50 transition-all">
              <span className="text-sm font-medium text-charcoal">Hola, {session.user.name || 'Usuario'}</span>
              <button 
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="text-xs font-bold text-red-600 uppercase tracking-wide px-3 py-1 bg-red-100 rounded-lg"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="py-3 px-4 rounded-xl text-center text-sm font-semibold text-cream bg-terracotta hover:bg-terracotta-dark transition-all tracking-wide uppercase shadow-sm"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
