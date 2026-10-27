# Architecture

## Workspace

Repository memakai pnpm workspace untuk dua aplikasi:

- `apps/web`: React 19 dan Vite. Saat ini masih halaman starter Vite/React dan belum memanggil API auth.
- `apps/api`: NestJS 12, Prisma 7, PostgreSQL, DTO `class-validator`, dan Vitest.

`compose.yaml` menyediakan PostgreSQL untuk development lokal. API menginisialisasi Prisma melalui PostgreSQL adapter dan mengambil koneksi dari `DATABASE_URL`.

## HTTP and authentication

Bootstrap API memasang cookie-parser, global `ValidationPipe` dengan whitelist dan penolakan properti yang tidak dikenal, serta CORS credentials untuk `WEB_ORIGIN` (default lokal `http://localhost:5173`).

Endpoint yang tersedia:

| Route                 | Perilaku                                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /auth/register` | Validasi email/password/nama, hash password dengan helper scrypt, tetapkan role `user`. Payload publik tidak menerima role.                  |
| `POST /auth/login`    | Verifikasi akun aktif dan password; kredensial gagal memberi error generik. Mengatur cookie access dan refresh; JSON hanya berisi user aman. |
| `POST /auth/refresh`  | Membaca refresh JWT dari cookie, merotasi token dalam family yang sama, dan tidak mengirim token pada JSON.                                  |
| `POST /auth/logout`   | Mencabut refresh token yang cocok dan menghapus cookie.                                                                                      |
| `GET /auth/me`        | Dilindungi access JWT; mengembalikan id, email, nama, dan role.                                                                              |

Access JWT berlaku 15 menit; refresh JWT berlaku 7 hari. Secret dibaca melalui `ConfigService` dari environment. Access dan refresh token dikirim sebagai cookie `httpOnly`, `sameSite=lax`; cookie menggunakan `secure` di production. Guard access menerima cookie access atau bearer token dan mengecek status akun dari database.

Database hanya menyimpan SHA-256 hash refresh token. Token yang sudah digunakan dicabut sebelum token baru dibuat; replay terdeteksi dengan `familyId` dan mencabut token aktif lain dalam family. Login/refresh tidak memasukkan token atau secret ke JSON response.

## Prisma and RBAC

Model Prisma meliputi `User`, `Role`, `Permission`, `UserRole`, `RolePermission`, dan `RefreshToken`. User dan role terhubung many-to-many; permission diberikan kepada role melalui `RolePermission`.

Role awal adalah `admin` dan `user`. Seed menghubungkan permission `profile:read` ke keduanya, serta `users:read` dan `users:manage` ke admin. Seed tidak membuat user admin atau password default. Registrasi publik hanya dapat membuat user ber-role `user`.

`@RequirePermissions(...)` menandai permission yang dibutuhkan route. `PermissionsGuard` memuat role dan permission terkait dari database dan mengharuskan seluruh permission yang diminta. Guard permission harus digunakan bersama `JwtAuthGuard` agar request sudah memiliki identitas user.

## Database lifecycle

Schema dan migration awal sudah tersedia. Migration development dikelola dengan Prisma Migrate; seed role/permission dapat dijalankan ulang. Perintah `migrate dev` dan seed dalam panduan setup hanya untuk database development lokal, bukan production/shared.
