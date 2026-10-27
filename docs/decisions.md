# Decisions

Dokumen ini mencatat pilihan yang terlihat pada implementasi saat ini, bukan riwayat diskusi yang tidak tersimpan.

| Area           | Keputusan saat ini                                                   | Dampak                                                                       |
| -------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Workspace      | pnpm monorepo dengan `apps/web` dan `apps/api`                       | Skrip paket dijalankan dengan filter workspace.                              |
| Web/API        | React + Vite terpisah dari NestJS API                                | UI dapat dikembangkan terpisah; UI auth belum terhubung.                     |
| Database       | PostgreSQL, Prisma schema, dan migration yang dikomit                | Struktur RBAC dan refresh session tersimpan secara relasional.               |
| Password       | Helper Node.js `scrypt` dengan salt acak dan verifikasi timing-safe  | Password tidak disimpan dalam bentuk plaintext.                              |
| Session        | JWT access 15 menit dan refresh 7 hari di cookie httpOnly            | Browser tidak menerima token melalui response JSON; cookie refresh dirotasi. |
| Refresh replay | Hash SHA-256 disimpan, `familyId` mengelompokkan rotasi              | Pemakaian ulang token yang sudah dicabut membatalkan family.                 |
| Authorization  | Role dan permission dari tabel relasional                            | Permission dievaluasi oleh guard menggunakan data database terkini.          |
| Bootstrap RBAC | Seed role dan permission, tanpa akun admin                           | Pembuatan akun admin harus dilakukan melalui proses terpisah yang aman.      |
| Database setup | `migrate dev` dan seed diarahkan hanya ke database development lokal | Tidak ada langkah migration production yang ditetapkan di dokumentasi ini.   |
