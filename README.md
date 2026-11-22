# Meesho E-Commerce Monorepo

A production-ready e-commerce monorepo initialized with **Bun**, orchestrated by **Turborepo**, featuring **Payload CMS 3.x** with **PostgreSQL**, and a modern storefront powered by the latest **Next.js (App Router)**, **Tailwind CSS**, and **shadcn/ui**.

---

## 🌟 Key Features

- ⚡ **Bun Runtime & Package Manager**: Ultra-fast installs and execution using Bun workspaces.
- 🚀 **Turborepo 2**: High-performance pipeline with intelligent caching and parallel task execution.
- 📦 **Payload CMS 3.x App (`apps/payload`)**:
  - Native Next.js 16 App Router integration.
  - **Multi-Tenant Plugin** (`@payloadcms/plugin-multi-tenant`):
    - Separate tenants/vendors (`Tenants` collection).
    - Multi-tenant data isolation for `Products`, `Orders`, `Media`, and `Pages`.
    - Tenant selector in the Admin navigation bar for super-admins.
    - Vendor/Seller role support with tenant-constrained access.
  - **PostgreSQL Database Adapter** (`@payloadcms/db-postgres`).
  - **Lexical Rich Text Editor** (`@payloadcms/richtext-lexical`).
  - Full E-commerce Schema: `Tenants`, `Products`, `Categories`, `Orders`, `Media`, `Users`, and `Pages`.
  - Admin Panel accessible at `http://localhost:3001/admin`.
  - Built-in REST & GraphQL APIs (`/api/products`, `/api/graphql`).
- 🛍️ **Customer Storefront App (`apps/web`)**:
  - Latest Next.js (App Router) running on port `3000`.
  - Styled with **Tailwind CSS** and **shadcn/ui** components.
  - Interactive Shopping Cart with sliding drawer sheet and full `/cart` page.
  - Complete checkout workflow with address capture and payment selection at `/checkout`.
  - Product Catalog with category filtering, search, and detail view (`/products/[slug]`).
  - Graceful data fetching from Payload CMS with fallback mock data for out-of-the-box preview.
- 🎨 **Shared UI Package (`packages/ui`)**:
  - Pre-configured shadcn/ui components (`Button`, `Card`, `Badge`, `Input`, `Separator`, `Sheet`).
  - Shared across apps using `@repo/ui`.
- 🐘 **Database Ready**:
  - Includes a `docker-compose.yml` for instant local PostgreSQL 16 setup.

---

## 📁 Monorepo Structure

```text
meesho/
├── apps/
│   ├── payload/               # Payload CMS App (Next.js 16 + PostgreSQL + Lexical)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (payload)/admin/   # Payload Admin Panel (/admin)
│   │   │   │   ├── (payload)/api/     # REST & GraphQL endpoints (/api)
│   │   │   │   └── (app)/             # Integrated Payload routes
│   │   │   ├── collections/           # Products, Categories, Orders, Media, Users
│   │   │   ├── payload.config.ts      # Payload & PostgreSQL adapter configuration
│   │   │   └── ...
│   │   ├── package.json       # @repo/payload (runs on http://localhost:3001)
│   │   ├── tsconfig.json
│   │   └── .env
│   └── web/                   # Customer Storefront (Next.js 16 + Tailwind CSS + shadcn)
│       ├── src/
│       │   ├── app/           # App Router: /, /products, /products/[slug], /cart, /checkout
│       │   ├── components/    # Navbar, Hero, ProductCard, CartSheet, Footer
│       │   ├── lib/           # Payload API Client & Cart Provider Context
│       │   └── types/         # E-commerce TypeScript types
│       ├── package.json       # @repo/web (runs on http://localhost:3000)
│       ├── tsconfig.json
│       └── .env.local
├── packages/
│   ├── ui/                    # Shared shadcn/ui component library (@repo/ui)
│   │   ├── src/components/    # Button, Card, Badge, Input, Sheet, Separator
│   │   ├── src/lib/utils.ts   # Tailwind clsx + twMerge utility
│   │   └── package.json
│   ├── typescript-config/     # Shared tsconfig presets (@repo/typescript-config)
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   └── react-library.json
│   └── eslint-config/         # Shared ESLint configs (@repo/eslint-config)
├── docker-compose.yml         # Local PostgreSQL 16 database
├── turbo.json                 # Turborepo task pipelines
├── package.json               # Root workspaces configuration
├── .gitignore
├── .env.example
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites

- [Bun](https://bun.sh/) (v1.2+) installed
- [Docker](https://www.docker.com/) (optional, for local PostgreSQL container) or an existing PostgreSQL instance

### 2. Start PostgreSQL Database

If you have Docker installed, start the database with:

```bash
bun run db:up
```

*Or use your existing PostgreSQL instance and ensure the database credentials match `.env`:*
```env
DATABASE_URL=postgres://postgres:postgrespassword@127.0.0.1:5432/meesho_ecommerce
```

### 3. Install Dependencies

Install all monorepo dependencies across apps and packages:

```bash
bun install
```

### 4. Run Development Servers

Start all applications in parallel with Turborepo:

```bash
bun dev
```

This launches:
- 🛍️ **Storefront**: [http://localhost:3000](http://localhost:3000)
- 🎛️ **Payload CMS Admin**: [http://localhost:3001/admin](http://localhost:3001/admin)
- 🔌 **Payload REST API**: [http://localhost:3001/api/products](http://localhost:3001/api/products)

---

## 🛠️ Monorepo Scripts

| Command | Action |
|---|---|
| `bun dev` | Runs both `@repo/web` (port 3000) and `@repo/payload` (port 3001) in watch mode |
| `bun run build` | Builds all packages and apps with Turborepo caching |
| `bun run lint` | Runs linters across workspaces |
| `bun run generate:importmap` | Regenerates Payload CMS import map for admin components |
| `bun run generate:types` | Regenerates TypeScript types from Payload collections |
| `bun run db:up` | Starts local PostgreSQL container in background |
| `bun run db:down` | Stops local PostgreSQL container |
| `bun run db:logs` | Streams PostgreSQL container logs |

---

## ⚙️ Environment Variables

Each app contains its own `.env` file (copied from `.env.example`):

### `apps/payload/.env`
```env
DATABASE_URL="postgres://postgres:postgrespassword@127.0.0.1:5432/meesho_ecommerce"
PAYLOAD_SECRET="meesho-payload-ecommerce-secret-key-32charsmin"
NEXT_PUBLIC_SERVER_URL="http://localhost:3001"
PAYLOAD_PUBLIC_SERVER_URL="http://localhost:3001"
NEXT_PUBLIC_STOREFRONT_URL="http://localhost:3000"
PREVIEW_SECRET="meesho-draft-preview-secret"
```

### `apps/web/.env.local`
```env
NEXT_PUBLIC_PAYLOAD_URL="http://localhost:3001"
NEXT_PUBLIC_SITE_NAME="Meesho Superstore"
```

---

## 🛒 Payload CMS E-commerce Setup

When accessing `http://localhost:3001/admin` for the first time:
1. Create your administrator account.
2. Manage your e-commerce catalog:
   - **Products**: Manage titles, descriptions, pricing, inventory, categories, and image galleries.
   - **Categories**: Organize your product lines with custom slugs and banners.
   - **Orders**: View customer orders, payment status, and shipping information.
   - **Media**: Upload images with automatic optimization.
