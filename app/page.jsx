import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 'calzado',
    title: 'Calzado Femenino',
    description: 'Elegancia italiana a cada paso. Colección de zapatillas, sandalias y chanclas de diseño único.',
    image: '/images/category-calzado.png',
    link: '/categoria/calzado',
  },
  {
    id: 'mandalas',
    title: 'Mandalas y Arte',
    description: 'Transforma tus espacios con cabeceras, cuadros y arte detallado que inspira tranquilidad.',
    image: '/images/category-mandalas.png',
    link: '/categoria/mandalas',
  },
  {
    id: 'marroquineria',
    title: 'Marroquinería y Cuero',
    description: 'Bolsos, carteras y monederos confeccionados a mano por artesanos expertos.',
    image: '/images/category-marroquineria.png',
    link: '/categoria/marroquineria',
  },
  {
    id: 'lamparas',
    title: 'Lámparas y Decoración',
    description: 'Ilumina tu hogar con piezas exclusivas en acrílico, madera y paneles decorativos.',
    image: '/images/category-lamparas.png',
    link: '/categoria/lamparas',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* We use a regular img tag here to easily utilize the copied image without Next Image setup overhead for local static files if needed, but Next/Image is better. */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/hero-banner.png)' }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-charcoal/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-90"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="animate-fade-in-up text-gold-light tracking-[0.3em] text-sm uppercase font-semibold mb-6 block drop-shadow-md">
            Colección Artesanal
          </span>
          <h1 className="animate-fade-in-up animation-delay-100 font-heading text-5xl md:text-7xl lg:text-8xl text-cream font-bold mb-6 drop-shadow-xl text-balance">
            Arte & Diseño <br />
            <span className="shimmer-text">Italiano</span>
          </h1>
          <p className="animate-fade-in-up animation-delay-200 text-lg md:text-xl text-cream-dark/90 mb-10 max-w-2xl text-balance font-light drop-shadow-md">
            Descubre piezas únicas elaboradas a mano. Desde exclusiva marroquinería 
            hasta decoración que transforma tus espacios.
          </p>
          <div className="animate-fade-in-up animation-delay-300">
            <a href="#categorias" className="btn-primary inline-flex items-center gap-2">
              <span>Explorar Colección</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY GRID SECTION ─── */}
      <section id="categorias" className="py-24 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-4">
              Nuestro Catálogo
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-terracotta to-gold mx-auto rounded-full mb-6 relative">
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-cream border-2 border-terracotta rounded-full"></div>
            </div>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Arte en su máxima expresión, disponible en boutique o elaborado bajo pedido exclusivamente para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((category) => (
              <Link 
                href={category.link} 
                key={category.id}
                className="category-card group h-[400px] md:h-[450px] w-full block"
              >
                {/* Background image */}
                <div 
                  className="card-image absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                
                {/* Overlay gradient */}
                <div className="card-overlay absolute inset-0" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-heading text-3xl md:text-4xl text-cream font-semibold mb-3 drop-shadow-md">
                      {category.title}
                    </h3>
                    <p className="text-cream-dark/90 text-sm md:text-base leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {category.description}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-gold-light text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 uppercase tracking-widest">
                      Ver productos
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFO BANNER (Bajo Pedido) ─── */}
      <section className="bg-charcoal py-16 text-cream relative overflow-hidden">
        {/* Decorative background mandala abstract */}
        <div className="absolute -top-40 -right-40 w-96 h-96 border-[40px] border-terracotta/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border-[60px] border-gold/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gold mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.82.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-balance">
            Piezas Únicas, <span className="text-gold">Bajo Pedido</span>
          </h2>
          <p className="text-warm-gray-light max-w-2xl mx-auto text-lg pt-2 text-balance leading-relaxed">
            Muchos de nuestros artículos son fabricados a mano en pequeñas cantidades. Si no encuentras disponibilidad inmediata, habilitamos la opción de encargo personalizado para fabricar tu pieza artesanal.
          </p>
        </div>
      </section>
    </div>
  );
}
