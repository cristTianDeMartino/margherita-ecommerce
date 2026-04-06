export const categoryData = {
  'calzado': {
    title: 'Calzado Femenino',
    description: 'Nuestra colección de calzado está diseñada para brindarte elegancia y confort en cada paso. Piezas únicas elaboradas por artesanos que cuidan hasta el más mínimo detalle.',
    banner: '/images/category-calzado.png',
    products: [
      { id: 'pro-1', title: 'Sandalia Romana di Firenze', price: '$120.00', image: '/images/product-sample.png', inStock: false, description: 'Elegante sandalia confeccionada a mano con el más fino cuero italiano. Su diseño minimalista y detalles dorados la hacen perfecta para eventos de gala o paseos nocturnos.', features: ['100% Cuero genuino', 'Hecho a mano en Italia', 'Suela antideslizante', 'Detalles dorados'] },
      { id: 'pro-2', title: 'Zapatilla Bianca Elegance', price: '$95.00', image: '/images/product-sample.png', inStock: true, description: 'Zapatilla casual ideal para el día a día sin perder el estilo.', features: ['Material sintético premium', 'Suela acolchada', 'Fácil de limpiar'] },
      { id: 'pro-3', title: 'Chancla de Cuero Toscana', price: '$65.00', image: '/images/product-sample.png', inStock: true, description: 'Frescura y diseño en una sola pieza artesanal.', features: ['Cuero ligero', 'Transpirable', 'Hecho a mano'] },
      { id: 'pro-4', title: 'Sandalia Dorada de Gala', price: '$140.00', image: '/images/product-sample.png', inStock: false, description: 'El máximo lujo para tus pies en eventos especiales.', features: ['Bañado en tonos dorados', 'Plantilla ergonómica', 'Edición limitada'] },
    ]
  },
  'mandalas': {
    title: 'Mandalas y Arte',
    description: 'Encuentra paz y armonía con nuestra exclusiva selección de mandalas, cuadros y respaldos para cama. Cada obra es una expresión de equilibrio y belleza intrincada.',
    banner: '/images/category-mandalas.png',
    products: [
      { id: 'man-1', title: 'Mandala Mural Florencia', price: '$220.00', image: '/images/category-mandalas.png', inStock: false, description: 'Mural de gran formato elaborado en madera tallada con láser.', features: ['Madera MDF de 5mm', 'Pintura ecológica', 'Incluye kit de montaje'] },
      { id: 'man-2', title: 'Caballo de Madera Tallada', price: '$180.00', image: '/images/category-mandalas.png', inStock: true, description: 'Escultura ornamental en madera nativa.', features: ['Madera sólida', 'Base metálica', 'Acabado en cera natural'] },
      { id: 'man-3', title: 'Cuadro Zen Floral', price: '$95.00', image: '/images/category-mandalas.png', inStock: true, description: 'Cuadro minimalista para espacios de relajación.', features: ['Impresión de alta calidad', 'Marco de pino', 'Cristal antirreflejante'] },
      { id: 'man-4', title: 'Cabecera de Cama Imperial', price: '$350.00', image: '/images/category-mandalas.png', inStock: false, description: 'Impresionante cabecera tallada artesanalmente.', features: ['Madera noble', 'Diseño exclusivo', 'Instalación incluida en zona local'] },
    ]
  },
  'marroquineria': {
    title: 'Marroquinería y Cuero',
    description: 'Accesorios que definen tu estilo. Explora nuestra gama de bolsos, carteras y monederos confeccionados con auténtico cuero italiano.',
    banner: '/images/category-marroquineria.png',
    products: [
      { id: 'mar-1', title: 'Bolso Milano Clásico', price: '$210.00', image: '/images/category-marroquineria.png', inStock: true, description: 'Un bolso atemporal que combina con todo.', features: ['Cuero de vaca', 'Bolsillos interiores', 'Correa ajustable'] },
      { id: 'mar-2', title: 'Cartera de Mano Siena', price: '$85.00', image: '/images/category-marroquineria.png', inStock: true, description: 'Elegancia pura para tus tarjetas y efectivo.', features: ['Múltiples ranuras', 'Cierre magnético', 'Diseño compacto'] },
      { id: 'mar-3', title: 'Monedero Vintage', price: '$45.00', image: '/images/category-marroquineria.png', inStock: false, description: 'Un toque retro para guardar tus monedas.', features: ['Broche metálico antiguo', 'Forro de algodón', 'Cuero teñido a mano'] },
    ]
  },
  'lamparas': {
    title: 'Lámparas y Decoración',
    description: 'Ilumina tus espacios con piezas que son obras de arte en sí mismas. Diseños en acrílico, madera y paneles que transforman la atmósfera de tu hogar.',
    banner: '/images/category-lamparas.png',
    products: [
      { id: 'lam-1', title: 'Lámpara de Loto Acrílica', price: '$150.00', image: '/images/category-lamparas.png', inStock: true, description: 'Diseño geométrico de loto que proyecta sombras increíbles.', features: ['Acrílico cortado a láser', 'Foco LED cálido incluido', 'Ahorro de energía'] },
      { id: 'lam-2', title: 'Panel Decorativo de Yeso', price: '$190.00', image: '/images/category-lamparas.png', inStock: false, description: 'Textura en 3D para tu pared principal.', features: ['Yeso artesanal', 'Pintable', 'Aislamiento acústico leve'] },
      { id: 'lam-3', title: 'Aplique de Pared Rústico', price: '$110.00', image: '/images/category-lamparas.png', inStock: true, description: 'Iluminación cálida con toque de cabaña elegante.', features: ['Madera reciclada', 'Metal forjado', 'Fácil conexión'] },
      { id: 'lam-4', title: 'Lámpara de Mesa Venecia', price: '$85.00', image: '/images/category-lamparas.png', inStock: true, description: 'El detalle perfecto para tu buró o escritorio.', features: ['Base de cerámica', 'Pantalla de lino', 'Interruptor rotativo'] },
    ]
  }
};

export const getAllProducts = () => {
  const all = [];
  Object.entries(categoryData).forEach(([catId, catObj]) => {
    catObj.products.forEach(p => {
      all.push({ 
        ...p, 
        categoryId: catId, 
        categoryName: catObj.title, 
        name: p.title // Alias for retrocompatibility with category page mapping
      });
    });
  });
  return all;
};

export const getProductById = (id) => {
  return getAllProducts().find(p => p.id === id);
};
