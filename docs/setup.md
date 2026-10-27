# Local Setup

## Requirements

- Node.js (workspace terakhir dibangun dengan Node 24).
- pnpm 12.3.4, sebagaimana dicantumkan di root `package.json`.
- Docker Compose untuk PostgreSQL lokal.

## Install and configure

Jalankan dari root repository:

```bash
pnpm install
docker compose up -d db
cp apps/api/.env.example apps/api/.env
```

`apps/api/.env.example` hanya menyediakan placeholder. Untuk konfigurasi Compose lokal, set `DATABASE_URL` ke `postgresql://starter:starter@localhost:5432/starter?schema=public`. Ganti kedua secret JWT dengan nilai acak yang berbeda, masing-masing minimal 32 karakter. `WEB_ORIGIN` default-nya `http://localhost:5173`; API mendengarkan port `3000` kecuali `PORT` diatur.

Jangan gunakan konfigurasi Compose atau `migrate dev` untuk database production/shared. Jangan commit file `.env` atau secret.

## Development database only

Perintah berikut ditujukan hanya untuk database development lokal yang dibuat oleh `compose.yaml`:

```bash
pnpm --filter api exec prisma migrate dev
pnpm --filter api db:seed
```

Migration yang ada membuat tabel user, role, permission, relasi RBAC, dan refresh token. Seed bersifat idempotent untuk role `admin`/`user` serta permission. Seed tidak membuat akun admin maupun password bawaan. Pastikan `DATABASE_URL` menunjuk ke database lokal sebelum menjalankan perintah database.

Jangan arahkan perintah ini ke database production/shared; workflow deployment untuk migration belum didokumentasikan di starter ini.

## Run applications

Jalankan API dan web dari dua terminal pada root repository:

```bash
pnpm --filter api start:dev
pnpm --filter web dev
```

API default di `http://localhost:3000`; Vite default di `http://localhost:5173`. API menerima credentials dari origin `WEB_ORIGIN` dan memakai cookie `secure` saat `NODE_ENV=production`.

## Tests and build

```bash
pnpm -r --if-present test
pnpm -r --if-present build
pnpm --filter api test:e2e
```

Status hasil terakhir yang tersedia: unit test workspace lulus, 15 test pada 7 file; build API dan web lulus. E2E belum dijalankan. E2E memakai aplikasi dan database, sehingga siapkan konfigurasi database development lokal terlebih dahulu.
