# Roadmap

## Current state

- Monorepo web/API, Prisma schema, migration awal, auth endpoints, cookie JWT, dan guard RBAC tersedia.
- Seed role/permission tersedia; tidak ada akun admin bawaan.
- Unit test workspace dan build API/web lulus pada pemeriksaan terakhir yang tercatat.
- E2E belum dijalankan.
- Web masih halaman starter Vite/React dan belum terhubung ke auth API.

## Candidate next steps

1. Tambahkan dan jalankan E2E auth terhadap PostgreSQL development lokal, termasuk refresh rotation, logout, dan akses `/auth/me`.
2. Hubungkan web ke endpoint auth dengan fetch credentials dan alur sesi yang sesuai cookie.
3. Tetapkan workflow deployment terpisah untuk secret production dan penerapan migration; jangan gunakan `migrate dev` pada production/shared.
4. Tambahkan CI yang menjalankan seluruh unit test dan build; tentukan prasyarat terisolasi untuk E2E.

Daftar ini adalah tindak lanjut yang disarankan dari kondisi repo saat ini, bukan komitmen atau fitur yang sudah dibuat.
