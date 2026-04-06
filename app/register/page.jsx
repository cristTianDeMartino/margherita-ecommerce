'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Crear usuario en DB
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al crear la cuenta');
        return;
      }

      // 2. Login automático tras registro exitoso
      const loginRes = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (loginRes?.error) {
        setError('Cuenta creada. Inicia sesión manualmente.');
        router.push('/login');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Problema de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-20 px-4 pt-28">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gold/10">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream-dark border-2 border-terracotta mb-4">
              <div className="w-6 h-6 bg-gold rounded-full"></div>
            </div>
            <h1 className="font-heading text-3xl font-bold text-terracotta tracking-widest uppercase">
              Crear Cuenta
            </h1>
            <p className="text-warm-gray text-sm mt-1">Únete a Margherita Ricci Italian Design</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">Nombre Completo</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ej. Ana Rossi"
                className="w-full bg-cream-dark p-3 rounded-xl border-2 border-transparent focus:border-terracotta outline-none transition-colors"
              />
            </div>
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
                minLength={6}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Mínimo 6 caracteres"
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
                  Creando cuenta...
                </>
              ) : 'Registrarme'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-charcoal-light">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-terracotta font-semibold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
