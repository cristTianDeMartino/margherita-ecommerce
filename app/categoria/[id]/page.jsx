import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

import { categoryData } from '@/lib/data';

export default async function CategoryPage({ params }) {
  // Obtenemos el id de la URL ("calzado", "mandalas", etc.)
  const { id } = await params;
  
  // Si la categoría no existe en nuestros datos, usamos una por defecto o mostramos error.
  // Aquí usamos "calzado" como fallback para efectos de maquetación si el slug no es exacto.
  const category = categoryData[id] || categoryData['calzado'];

  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* ─── Categoría Hero Banner ─── */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.banner})` }}
        >
          <div className="absolute inset-0 bg-charcoal/60"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl text-cream font-bold mb-4 uppercase tracking-widest drop-shadow-lg">
            {category.title}
          </h1>
          <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-cream-dark/90 text-lg text-balance drop-shadow-md">
            {category.description}
          </p>
        </div>
      </section>

      {/* ─── Grid de Productos ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filtros Simples y Breadcrumb */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
           <nav className="flex items-center gap-2 text-sm text-warm-gray">
            <Link href="/" className="hover:text-terracotta transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-charcoal-light font-medium uppercase tracking-wide">{category.title}</span>
          </nav>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-warm-gray">Ordenar por:</span>
            <select className="bg-cream-dark border-none rounded-lg px-4 py-2 text-charcoal outline-none cursor-pointer focus:ring-2 focus:ring-terracotta/50">
              <option>Relevancia</option>
              <option>Menor Precio</option>
              <option>Mayor Precio</option>
            </select>
          </div>
        </div>

        {/* Productos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {category.products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        
      </section>
    </div>
  );
}
