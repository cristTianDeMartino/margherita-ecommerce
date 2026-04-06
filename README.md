# Margherita Ricci Italian Design - E-commerce

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.6.0-2D3748?style=for-the-badge&logo=prisma)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24.13-purple?style=for-the-badge&logo=nextauth)

Plataforma de comercio electrónico Full-Stack para **Margherita Ricci Italian Design**. Construida con las últimas tecnologías web para ofrecer una experiencia de usuario fluida, rápida y segura.

## 🚀 Características Principales

- **Catálogo de Productos**: Muestra de productos con un diseño exquisito y moderno.
- **Autenticación Segura**: Registro e inicio de sesión de usuarios utilizando **NextAuth.js** y **bcryptjs** para el encriptado de las contraseñas.
- **Base de Datos Robusta**: Integración con **Prisma ORM** utilizando el adaptador para **SQLite** (`better-sqlite3`), asegurando eficiencia y persistencia completa.
- **Diseño UI/UX Premium**: Estilos desarrollados con el nuevo **TailwindCSS 4**, garantizando interfaces adaptativas en todos los dispositivos.

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - Next.js (App Router)
  - React 19
  - TailwindCSS 4
- **Backend:**
  - Next.js API Routes / Server Actions
  - NextAuth.js
- **Base de Datos & ORM:**
  - Prisma
  - SQLite (`better-sqlite3`)
- **Seguridad:**
  - bcryptjs

## ⚙️ Requisitos Previos

Asegúrate de tener instalado en tu sistema local:

- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- Tu gestor de paquetes favorito: `npm`, `yarn`, `pnpm` o `bun`.

## 📦 Instalación y Configuración Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/cristTianDeMartino/margherita-ecommerce.git
cd margheritaBoutique
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y ajusta las variables necesarias:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="tu_secreto_para_nextauth_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

> **Tip:** Puedes generar una clave segura para `NEXTAUTH_SECRET` ejecutando: `openssl rand -base64 32`.

### 4. Inicializar la base de datos (Prisma)

Ejecuta el siguiente comando para sincronizar el esquema y generar el cliente de Prisma:

```bash
npx prisma db push
```

Para visualizar y gestionar los registros de la base de datos gráficamente, puedes abrir Prisma Studio:

```bash
npx prisma studio
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la tienda en vivo.

## 📁 Estructura Principal del Proyecto

- `app/` - Rutas de App Router, layouts principales y endpoints (`app/api/auth/[...nextauth]/route.js`).
- `components/` - Componentes reutilizables de UI (ej. tarjetas de productos, navegación).
- `prisma/` - Contiene el esquema de base de datos (`schema.prisma`) y scripts de verificación.

## 🤝 Soporte y Contribución

Si necesitas aportar un cambio, por favor haz un _fork_ del proyecto y envía un Pull Request con tus mejoras.

## 📄 Licencia

Todos los derechos reservados. Desarrollado para Margherita Ricci Italian Design.
