# Vite + NestJS RBAC Starter

Starter monorepo dengan React/Vite untuk web, NestJS untuk API, PostgreSQL melalui Docker Compose, dan Prisma untuk data serta RBAC. API menyediakan registrasi, login, refresh/logout berbasis cookie httpOnly, profil terproteksi, dan pemeriksaan permission dari database.

Web masih berisi halaman starter Vite/React; integrasi UI dengan endpoint auth belum tersedia.

## Quick Start

Prerequisite: Node.js, pnpm 12.3.4, dan Docker Compose.

```bash
pnpm install
docker compose up -d db
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` untuk development lokal:

- `DATABASE_URL` gunakan kredensial lokal Compose (`starter` sebagai user dan password, database `starter`).
- Isi `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` dengan nilai acak yang berbeda.
- `WEB_ORIGIN` default lokal adalah `http://localhost:5173`.

Jalankan migration dan seed hanya pada database development lokal:

```bash
pnpm --filter api exec prisma migrate dev
pnpm --filter api db:seed
```

Seed membuat role `admin`/`user` dan permission, tetapi tidak membuat akun admin.

Di terminal terpisah:

```bash
pnpm --filter api start:dev
pnpm --filter web dev
```

Web berjalan pada URL Vite yang ditampilkan terminal (default `http://localhost:5173`); API default pada port `3000`.

Lihat [Setup](docs/setup.md), [Architecture](docs/architecture.md), [Decisions](docs/decisions.md), [Roadmap](docs/roadmap.md), dan [Skills](docs/skills.md).

## Verification Status

Hasil pemeriksaan terakhir yang tercatat: seluruh unit test workspace lulus (15 test pada 7 file), dan build API serta web lulus. E2E belum dijalankan.
