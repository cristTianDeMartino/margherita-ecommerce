// prisma/seed.js
// Ejecutar con: node prisma/seed.js
// En Prisma 7, usamos better-sqlite3 directamente para el seed (sin adapter de Prisma)

const Database = require('better-sqlite3');
const path = require('path');
const { randomUUID } = require('crypto');

const dbPath = path.join(__dirname, '..', 'dev.db');
const db = new Database(dbPath);

const now = new Date().toISOString();

const products = [
  // Calzado
  { title: 'Sandalia Romana di Firenze', description: 'Elegante sandalia confeccionada a mano con el más fino cuero italiano. Detalles dorados perfecta para eventos de gala.', price: 120.00, image: '/images/product-sample.png', categoryId: 'calzado', inStock: 0 },
  { title: 'Zapatilla Bianca Elegance', description: 'Zapatilla casual ideal para el día a día sin perder el estilo. Material sintético premium con suela acolchada.', price: 95.00, image: '/images/product-sample.png', categoryId: 'calzado', inStock: 1 },
  { title: 'Chancla de Cuero Toscana', description: 'Frescura y diseño en una sola pieza artesanal. Cuero ligero y transpirable, hecha a mano.', price: 65.00, image: '/images/product-sample.png', categoryId: 'calzado', inStock: 1 },
  { title: 'Sandalia Dorada de Gala', description: 'El máximo lujo para tus pies en eventos especiales. Bañada en tonos dorados, edición limitada.', price: 140.00, image: '/images/product-sample.png', categoryId: 'calzado', inStock: 0 },
  // Mandalas
  { title: 'Mandala Mural Florencia', description: 'Mural de gran formato elaborado en madera tallada con láser. Incluye kit de montaje.', price: 220.00, image: '/images/category-mandalas.png', categoryId: 'mandalas', inStock: 0 },
  { title: 'Caballo de Madera Tallada', description: 'Escultura ornamental en madera nativa con base metálica. Acabado en cera natural.', price: 180.00, image: '/images/category-mandalas.png', categoryId: 'mandalas', inStock: 1 },
  { title: 'Cuadro Zen Floral', description: 'Cuadro minimalista para espacios de relajación. Marco de pino con cristal antirreflejante.', price: 95.00, image: '/images/category-mandalas.png', categoryId: 'mandalas', inStock: 1 },
  { title: 'Cabecera de Cama Imperial', description: 'Impresionante cabecera tallada artesanalmente en madera noble. Diseño exclusivo.', price: 350.00, image: '/images/category-mandalas.png', categoryId: 'mandalas', inStock: 0 },
  // Marroquinería
  { title: 'Bolso Milano Clásico', description: 'Un bolso atemporal que combina con todo. Cuero de vaca, bolsillos interiores y correa ajustable.', price: 210.00, image: '/images/category-marroquineria.png', categoryId: 'marroquineria', inStock: 1 },
  { title: 'Cartera de Mano Siena', description: 'Elegancia pura para tus tarjetas y efectivo. Múltiples ranuras con cierre magnético.', price: 85.00, image: '/images/category-marroquineria.png', categoryId: 'marroquineria', inStock: 1 },
  { title: 'Monedero Vintage', description: 'Un toque retro para guardar tus monedas. Broche metálico antiguo y cuero teñido a mano.', price: 45.00, image: '/images/category-marroquineria.png', categoryId: 'marroquineria', inStock: 0 },
  // Lámparas
  { title: 'Lámpara de Loto Acrílica', description: 'Diseño geométrico de loto en acrílico cortado a láser. Proyecta sombras increíbles, LED incluido.', price: 150.00, image: '/images/category-lamparas.png', categoryId: 'lamparas', inStock: 1 },
  { title: 'Panel Decorativo de Yeso', description: 'Textura en 3D para tu pared principal. Yeso artesanal pintable con aislamiento acústico.', price: 190.00, image: '/images/category-lamparas.png', categoryId: 'lamparas', inStock: 0 },
  { title: 'Aplique de Pared Rústico', description: 'Iluminación cálida con toque de cabaña elegante. Madera reciclada con metal forjado.', price: 110.00, image: '/images/category-lamparas.png', categoryId: 'lamparas', inStock: 1 },
  { title: 'Lámpara de Mesa Venecia', description: 'El detalle perfecto para tu buró o escritorio. Base de cerámica con pantalla de lino.', price: 85.00, image: '/images/category-lamparas.png', categoryId: 'lamparas', inStock: 1 },
];

console.log('🌱 Iniciando seed de productos...');

// Limpiar tabla
db.prepare('DELETE FROM Product').run();
console.log('   Limpieza completada.');

const insert = db.prepare(`
  INSERT INTO Product (id, title, description, price, image, categoryId, inStock, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const p of products) {
  const id = randomUUID();
  insert.run(id, p.title, p.description, p.price, p.image, p.categoryId, p.inStock, now, now);
  console.log(`   ✓ ${p.title}`);
}

console.log(`\n✅ Seed completado. ${products.length} productos insertados.`);
db.close();
