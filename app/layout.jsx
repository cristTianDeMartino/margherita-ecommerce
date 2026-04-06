import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/app/Providers';
import CartSidebar from '@/components/CartSidebar';

export const metadata = {
  title: 'Margherita Ricci Italian Design — Boutique Artesanal',
  description:
    'Descubre productos artesanales de diseño italiano: calzado femenino, mandalas, marroquinería y lámparas decorativas. Disponibles en tienda y bajo pedido.',
  keywords: [
    'diseño italiano',
    'artesanal',
    'calzado femenino',
    'mandalas',
    'marroquinería',
    'lámparas',
    'boutique',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col relative">
        <Providers>
          <Navbar />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
