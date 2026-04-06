'use client';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSimulatedPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular delay de pasarela de pago (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    /*
     * ─── NOTA PARA PRODUCCIÓN ───────────────────────────────────────────────────
     * Para activar pagos reales, se necesitará:
     *
     * 1. PASARELA DE PAGO: Contratar Stripe (ideal para tarjetas) o MercadoPago
     *    (popular en México/LATAM). Ambos tienen soporte para Next.js.
     *
     * 2. API KEYS: Añadir al `.env`:
     *    STRIPE_SECRET_KEY="sk_live_..."
     *    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
     *
     * 3. COMPONENTE SEGURO: Reemplazar el formulario HTML por el componente
     *    <Elements> de Stripe que maneja la captura de datos de tarjeta en un
     *    iframe seguro (PCI-DSS compliant). Nunca tocar los números de tarjeta
     *    directamente en tu servidor.
     *
     * 4. WEBHOOK: Crear `app/api/webhooks/stripe/route.js` para que Stripe
     *    notifique automáticamente cuando el pago es confirmado por el banco.
     *    Ahí se actualizará el status de la Order en Prisma a "Pagado".
     *
     * 5. PRISMA ORDER: Reemplazar el `clearCart()` de abajo por una llamada a
     *    `/api/orders` que haga `prisma.order.create({ data: {...} })` y guarde
     *    los items del carrito con su userId de NextAuth.
     * ────────────────────────────────────────────────────────────────────────────
     */

    setIsProcessing(false);
    setSuccess(true);
    clearCart();
  };

  // ─── Vista de Éxito ───────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-cream flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gold/10">
          <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-charcoal mb-3">¡Pago Exitoso!</h1>
          <p className="text-warm-gray mb-2">Tu orden ha sido procesada correctamente.</p>
          <p className="text-xs text-warm-gray-light mb-8 italic">(Modo simulación — sin cargo real)</p>
          <button onClick={() => router.push('/')} className="btn-primary w-full">
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  // ─── Carrito Vacío ────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-cream flex flex-col items-center justify-center gap-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-warm-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
        <h1 className="font-heading text-2xl text-charcoal">Tu carrito está vacío</h1>
        <button onClick={() => router.push('/')} className="btn-primary">Explorar productos</button>
      </div>
    );
  }

  // ─── Vista Principal de Checkout ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold">
            Finalizar Compra
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-terracotta to-gold rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Columna Izquierda: Formularios ── */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSimulatedPayment} className="flex flex-col gap-6">

              {/* Sección 1: Dirección */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gold/10">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-6 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-terracotta text-cream text-sm font-bold flex items-center justify-center">1</span>
                  Dirección de Envío
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Nombre completo" className="col-span-2 bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                  <input required type="text" placeholder="Calle y número exterior" className="col-span-2 bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                  <input type="text" placeholder="Colonia / Apto (opcional)" className="col-span-2 bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                  <input required type="text" placeholder="Ciudad" className="bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                  <input required type="text" placeholder="Estado" className="bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                  <input required type="text" placeholder="Código Postal" className="bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                  <input required type="tel" placeholder="Teléfono de contacto" className="bg-cream-dark p-3 rounded-xl border border-transparent focus:border-terracotta outline-none transition-colors" />
                </div>
              </div>

              {/* Sección 2: Método de Pago */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gold/10">
                <h2 className="font-heading text-xl font-semibold text-charcoal mb-6 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-terracotta text-cream text-sm font-bold flex items-center justify-center">2</span>
                  Método de Pago
                </h2>

                {/* Selector de método */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-terracotta bg-terracotta/5' : 'border-gold/20 hover:border-gold/40'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="font-medium text-sm text-charcoal">Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'paypal' ? 'border-blue-400 bg-blue-50' : 'border-gold/20 hover:border-gold/40'}`}
                  >
                    <span className="font-bold text-blue-900 italic text-lg leading-none">Pay</span>
                    <span className="font-bold text-blue-400 italic text-lg leading-none">Pal</span>
                  </button>
                </div>

                {/* Formulario de Tarjeta */}
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Número de tarjeta"
                      maxLength={16}
                      className="col-span-2 p-3 rounded-xl border border-gold/20 focus:border-terracotta outline-none transition-colors font-mono tracking-widest"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Titular de la tarjeta"
                      className="col-span-2 p-3 rounded-xl border border-gold/20 focus:border-terracotta outline-none transition-colors"
                    />
                    <input
                      required
                      type="text"
                      placeholder="MM / YY"
                      maxLength={5}
                      className="p-3 rounded-xl border border-gold/20 focus:border-terracotta outline-none transition-colors font-mono"
                    />
                    <input
                      required
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      className="p-3 rounded-xl border border-gold/20 focus:border-terracotta outline-none transition-colors font-mono"
                    />
                    <p className="col-span-2 text-xs text-warm-gray flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Modo simulación — los datos no se almacenan ni procesan.
                    </p>
                  </div>
                )}

                {/* Vista PayPal Simulado */}
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-6 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-blue-800 font-bold text-xl italic mb-2">PayPal</p>
                    <p className="text-sm text-blue-600 mb-4">Al hacer clic en Pagar, se simulará la conexión con PayPal.</p>
                    <div className="text-xs text-blue-400">(Modo demo — sin cobro real)</div>
                  </div>
                )}
              </div>

              {/* Botón de Pago */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full py-4 text-lg flex justify-center items-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Procesando pago...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Confirmar y Pagar ${cartTotal.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Columna Derecha: Resumen de Orden ── */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gold/10 sticky top-28">
              <h3 className="font-heading text-2xl font-semibold mb-6 text-charcoal">
                Resumen del Pedido
              </h3>

              <div className="flex flex-col gap-4 mb-6 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center pb-4 border-b border-gold/10 last:border-0">
                    <div
                      className="w-14 h-14 rounded-lg bg-cream-dark flex-shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-charcoal leading-tight truncate">{item.title}</p>
                      <p className="text-xs text-warm-gray">Cant: {item.quantity}</p>
                      {item.isOrder && (
                        <span className="text-[9px] uppercase font-bold text-terracotta tracking-wider">Bajo Pedido</span>
                      )}
                    </div>
                    <p className="font-medium text-terracotta flex-shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold/20 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-charcoal-light">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-charcoal-light">
                  <span>Envío</span>
                  <span className="text-terracotta font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-charcoal pt-3 border-t border-gold/20">
                  <span>Total</span>
                  <span className="text-terracotta">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-xs text-center text-warm-gray mt-4 flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Transacción simulada — sin cargo real
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
