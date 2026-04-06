import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-gradient text-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl font-bold text-cream mb-4 uppercase tracking-widest">Margherita Ricci</h3>
            <p className="text-warm-gray-light text-sm leading-relaxed max-w-xs">
              Boutique artesanal de diseño italiano. Productos únicos que cuentan una historia de
              tradición y elegancia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-4">Categorías</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Calzado Femenino', href: '/categoria/calzado' },
                { name: 'Mandalas & Arte', href: '/categoria/mandalas' },
                { name: 'Marroquinería', href: '/categoria/marroquineria' },
                { name: 'Lámparas & Decoración', href: '/categoria/lamparas' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray-light hover:text-gold-light transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-sm text-warm-gray-light">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Boutique Local
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                hola@margherita.design
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-gray">
            &copy; {new Date().getFullYear()} Margherita Ricci Italian Design. Todos los derechos reservados.
          </p>
          <p className="text-xs text-warm-gray-light/60">
            Hecho con <span className="text-terracotta">♥</span> en Italia
          </p>
        </div>
      </div>
    </footer>
  );
}
