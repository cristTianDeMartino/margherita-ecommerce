'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('Correo o contraseña incorrectos.');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-20 px-4 pt-28">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gold/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream-dark border-2 border-terracotta mb-4">
              <div className="w-6 h-6 bg-gold rounded-full"></div>
            </div>
            <h1 className="font-heading text-3xl font-bold text-terracotta tracking-widest uppercase">
              Iniciar Sesión
            </h1>
            <p className="text-warm-gray text-sm mt-1">Bienvenida de nuevo a Margherita Ricci</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="hola@ejemplo.com"
                className="w-full bg-cream-dark p-3 rounded-xl border-2 border-transparent focus:border-terracotta outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Contraseña</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-cream-dark p-3 rounded-xl border-2 border-transparent focus:border-terracotta outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 mt-2 flex justify-center items-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verificando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-light">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-terracotta font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
