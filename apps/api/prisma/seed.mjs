if (!process.env.DATABASE_URL && typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('.env');
  } catch {}
}
import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../dist/generated/prisma/client.js';

const N = 1 << 15;
const R = 8;
const P = 1;
const SALT_BYTES = 16;
const KEY_BYTES = 64;
const MAXMEM = 64 * 1024 * 1024;

function derive(password, salt) {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, KEY_BYTES, { N, r: R, p: P, maxmem: MAXMEM }, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

async function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES);
  const key = await derive(password, salt);
  return `scrypt-v1$${N}$${R}$${P}$${salt.toString('base64url')}$${key.toString('base64url')}`;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required to seed portfolio data');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const permissionDefinitions = [
  // Core user management
  { key: 'profile:read', description: 'Read own profile', roles: ['admin', 'user'] },
  { key: 'users:read', description: 'Read users', roles: ['admin'] },
  { key: 'users:manage', description: 'Manage users', roles: ['admin'] },
  // Portfolio domain permissions (M2)
  { key: 'projects:read', description: 'Read all projects including drafts', roles: ['admin'] },
  { key: 'projects:manage', description: 'Manage projects and image gallery', roles: ['admin'] },
  { key: 'experiences:read', description: 'Read work experiences', roles: ['admin', 'user'] },
  { key: 'experiences:manage', description: 'Manage work experiences', roles: ['admin'] },
  { key: 'skills:read', description: 'Read technical skills', roles: ['admin', 'user'] },
  { key: 'skills:manage', description: 'Manage technical skills and icons', roles: ['admin'] },
  { key: 'inquiries:read', description: 'Read contact inquiries', roles: ['admin'] },
  { key: 'inquiries:manage', description: 'Manage contact inquiries', roles: ['admin'] },
  { key: 'media:upload', description: 'Upload media to Cloudinary', roles: ['admin'] },
];

const projectsData = [
  {
    title: 'RS Bintan Health Ecosystem & SIMRS Cloud',
    slug: 'simrs-bintan-cloud',
    summary:
      'Enterprise Cloud-Native Hospital Information System with FHIR compliance, BPJS API bridging, and real-time electronic medical records.',
    description: `## Enterprise Hospital Management & Clinical Integration

Platform sistem informasi manajemen rumah sakit (SIMRS) berbasis cloud yang dirancang untuk fasilitas kesehatan skala menengah hingga besar di Kepulauan Riau. Sistem ini mengintegrasikan seluruh alur layanan mulai dari registrasi rawat jalan/inap, farmasi, laboratorium, hingga bridging otomatis ke BPJS Kesehatan (VClaim & Antrean Online).

### Fitur Utama:
- **Zero-Downtime BPJS Bridging**: Sinkronisasi data kepesertaan, SEP, rujukan, dan update ketersediaan tempat tidur secara real-time.
- **Standarisasi Rekam Medis Elektronik (RME) FHIR**: Interoperabilitas data medis pasien sesuai standar Kementerian Kesehatan SATUSEHAT.
- **Antrean Poliklinik & Display Farmasi**: Display monitor real-time dengan WebSockets dan notifikasi suara terotomasi.
- **Arsitektur High-Availability**: Backend NestJS modular dengan caching Redis dan database PostgreSQL terisolasi per tenant.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    thumbnailPublicId: 'portfolio/projects/simrs-thumb',
    repoUrl: 'https://github.com/elrazaq/simrs-cloud-core',
    techStack: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker', 'Redis'],
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/simrs-gallery-1',
        caption: 'Real-Time Clinical Analytics & Telemedicine Dashboard',
        sortOrder: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/simrs-gallery-2',
        caption: 'Electronic Medical Record (EMR) & FHIR Interoperability Module',
        sortOrder: 2,
      },
    ],
  },
  {
    title: 'LogiFlow — Enterprise Maritime Logistics & Telematics',
    slug: 'logiflow-telematics',
    summary:
      'Real-time maritime cargo tracking and fleet management system across Indonesian archipelagic waters.',
    description: `## Archipelago Supply Chain & Vessel Telematics

Sistem manajemen logistik dan pelacakan kargo maritim terdistribusi untuk armada kapal kargo antar-pulau. Dilengkapi aplikasi mobile offline-first bagi nakhoda kapal untuk pencatatan manifest kargo di area minim sinyal.

### Fitur Utama:
- **Offline-First Synchronization**: Penyimpanan lokal di perangkat mobile dengan auto-sync saat kapal kembali menjangkau jaringan seluler/satelit.
- **Live Vessel Telemetry**: Pelacakan posisi kapal, efisiensi bahan bakar, dan estimasi waktu sandar (*ETA*) berbasis WebSockets dan geospatial GIS.
- **Automated Digital Waybill**: Tanda tangan digital penerimaan barang dan audit trail manifes kapal tamper-proof.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    thumbnailPublicId: 'portfolio/projects/logiflow-thumb',
    repoUrl: 'https://github.com/elrazaq/logiflow-telematics',
    techStack: ['Vue 3', 'Nuxt.js', 'Flutter', 'Dart', 'Node.js', 'PostgreSQL', 'WebSockets'],
    isFeatured: true,
    isPublished: true,
    sortOrder: 2,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/logiflow-gallery-1',
        caption: 'Fleet Route Optimization & Port Congestion Heatmap',
        sortOrder: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/logiflow-gallery-2',
        caption: 'Mobile Vessel Telemetry & Offline Cargo Manifest App',
        sortOrder: 2,
      },
    ],
  },
  {
    title: 'KepriMart — Regional Omnichannel E-Commerce & POS',
    slug: 'keprimart-omnichannel',
    summary:
      'High-concurrency retail commerce platform with automated payment reconciliation and localized inventory management.',
    description: `## Multi-Merchant Regional Retail Platform

Platform omnichannel terintegrasi yang menghubungkan toko fisik dengan kanal online bagi puluhan pedagang retail di Kepulauan Riau. Menangani lonjakan transaksi secara andal dengan arsitektur event-driven.

### Fitur Utama:
- **Unified Inventory**: Sinkronisasi stok terpusat antara mesin Point of Sale (POS) di gerai dan toko online web/mobile.
- **Instant Payment Gateway Reconciliation**: Verifikasi otomatis transaksi QRIS, Virtual Account, dan kartu debit tanpa delay.
- **Sub-Second Search**: Pencarian katalog produk ribuan SKU berbasis fuzzy search dan database indexing.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1200&q=80',
    thumbnailPublicId: 'portfolio/projects/keprimart-thumb',
    repoUrl: 'https://github.com/elrazaq/keprimart-omnichannel',
    techStack: ['React 19', 'Vite', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Prisma'],
    isFeatured: true,
    isPublished: true,
    sortOrder: 3,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/keprimart-gallery-1',
        caption: 'Merchant Administration Console & POS Hardware Bridge',
        sortOrder: 1,
      },
    ],
  },
];

const experiencesData = [
  {
    company: 'PT Solusi Digital Nusantara',
    role: 'Lead Full-Stack Web & Mobile Engineer',
    location: 'Bintan / Batam (Hybrid)',
    startDate: new Date('2022-01-01'),
    endDate: null,
    isCurrent: true,
    description:
      'Memimpin rekayasa sistem enterprise terdistribusi, memandu tim engineering, merancang arsitektur microservices performa tinggi, dan mengimplementasikan CI/CD pipelines otomatis.',
    technologies: ['React 19', 'Next.js', 'NestJS', 'Flutter', 'PostgreSQL', 'Docker', 'Redis'],
    sortOrder: 1,
  },
  {
    company: 'Global Telematics Indonesia',
    role: 'Senior Full-Stack Developer',
    location: 'Remote',
    startDate: new Date('2020-03-01'),
    endDate: new Date('2021-12-31'),
    isCurrent: false,
    description:
      'Mengembangkan sistem pelacakan IoT maritim real-time, dashboard analitik berbasis WebSockets, dan aplikasi mobile Flutter dengan arsitektur offline-first.',
    technologies: ['Vue 3', 'Nuxt.js', 'Node.js', 'Flutter', 'PostgreSQL', 'WebSockets'],
    sortOrder: 2,
  },
  {
    company: 'Riau Health Tech Labs',
    role: 'Software Engineer',
    location: 'Tanjungpinang, Kepulauan Riau',
    startDate: new Date('2018-07-01'),
    endDate: new Date('2020-02-28'),
    isCurrent: false,
    description:
      'Membangun modul SIMRS, bridging data asuransi BPJS, dan integrasi standar rekam medis rumah sakit regional.',
    technologies: ['PHP', 'Laravel', 'JavaScript', 'MySQL', 'RESTful API'],
    sortOrder: 3,
  },
];

const skillsData = [
  // FRONTEND
  { name: 'React 19', category: 'FRONTEND', iconUrl: '/skills/react.png', proficiency: 95, sortOrder: 1 },
  { name: 'Next.js', category: 'FRONTEND', iconUrl: '/skills/nextjs.png', proficiency: 92, sortOrder: 2 },
  { name: 'Vue 3', category: 'FRONTEND', iconUrl: '/skills/vue.png', proficiency: 88, sortOrder: 3 },
  { name: 'Nuxt.js', category: 'FRONTEND', iconUrl: '/skills/nuxt.png', proficiency: 85, sortOrder: 4 },
  { name: 'TypeScript', category: 'FRONTEND', iconUrl: '/skills/typescript.png', proficiency: 92, sortOrder: 5 },
  { name: 'Vite', category: 'FRONTEND', iconUrl: '/skills/vite.png', proficiency: 90, sortOrder: 6 },
  // BACKEND
  { name: 'NestJS', category: 'BACKEND', iconUrl: '/skills/nestjs.png', proficiency: 90, sortOrder: 1 },
  { name: 'Prisma ORM', category: 'BACKEND', iconUrl: '/skills/prisma.png', proficiency: 92, sortOrder: 2 },
  { name: 'Node.js', category: 'BACKEND', iconUrl: null, proficiency: 90, sortOrder: 3 },
  // DATABASE
  { name: 'PostgreSQL', category: 'DATABASE', iconUrl: '/skills/postgresql.png', proficiency: 90, sortOrder: 1 },
  { name: 'Redis', category: 'DATABASE', iconUrl: null, proficiency: 82, sortOrder: 2 },
  // DEVOPS & TOOLS
  { name: 'Docker', category: 'DEVOPS_TOOLS', iconUrl: '/skills/docker.png', proficiency: 86, sortOrder: 1 },
  { name: 'Linux', category: 'DEVOPS_TOOLS', iconUrl: '/skills/linux.png', proficiency: 88, sortOrder: 2 },
  // MOBILE & OTHER
  { name: 'Flutter', category: 'DESIGN_OTHER', iconUrl: '/skills/flutter.png', proficiency: 88, sortOrder: 1 },
];

try {
  console.log('Seeding roles and permissions...');
  const roles = {};
  for (const name of ['admin', 'user']) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name} role` },
    });
  }

  for (const definition of permissionDefinitions) {
    const permission = await prisma.permission.upsert({
      where: { key: definition.key },
      update: { description: definition.description },
      create: { key: definition.key, description: definition.description },
    });
    for (const roleName of definition.roles) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roles[roleName].id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: { roleId: roles[roleName].id, permissionId: permission.id },
      });
    }
  }

  console.log('Seeding default administrator accounts...');
  const adminPasswordHash = await hashPassword('Admin#Razak2026!');

  // Primary admin account
  const primaryAdmin = await prisma.user.upsert({
    where: { email: 'admin@elrazaq.dev' },
    update: {
      name: 'Abdul Razak, S.T.',
      passwordHash: adminPasswordHash,
      isActive: true,
    },
    create: {
      email: 'admin@elrazaq.dev',
      name: 'Abdul Razak, S.T.',
      passwordHash: adminPasswordHash,
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: primaryAdmin.id,
        roleId: roles['admin'].id,
      },
    },
    update: {},
    create: {
      userId: primaryAdmin.id,
      roleId: roles['admin'].id,
    },
  });
  console.log(`Primary admin ready: ${primaryAdmin.email} (Role: admin)`);

  // Personal alias admin account
  const personalAdmin = await prisma.user.upsert({
    where: { email: 'elrazaq185@gmail.com' },
    update: {
      name: 'Abdul Razak, S.T.',
      passwordHash: adminPasswordHash,
      isActive: true,
    },
    create: {
      email: 'elrazaq185@gmail.com',
      name: 'Abdul Razak, S.T.',
      passwordHash: adminPasswordHash,
      isActive: true,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: personalAdmin.id,
        roleId: roles['admin'].id,
      },
    },
    update: {},
    create: {
      userId: personalAdmin.id,
      roleId: roles['admin'].id,
    },
  });
  console.log(`Personal admin alias ready: ${personalAdmin.email} (Role: admin)`);

  console.log('Seeding portfolio projects and gallery images...');
  for (const projectData of projectsData) {
    const { images, ...projectFields } = projectData;
    const project = await prisma.project.upsert({
      where: { slug: projectFields.slug },
      update: projectFields,
      create: projectFields,
    });

    // Seed gallery images
    for (const img of images) {
      const existingImg = await prisma.projectImage.findFirst({
        where: { projectId: project.id, url: img.url },
      });
      if (!existingImg) {
        await prisma.projectImage.create({
          data: {
            projectId: project.id,
            url: img.url,
            publicId: img.publicId,
            caption: img.caption,
            sortOrder: img.sortOrder,
          },
        });
      }
    }
  }

  console.log('Seeding work experiences...');
  for (const exp of experiencesData) {
    const existing = await prisma.experience.findFirst({
      where: { company: exp.company, role: exp.role },
    });
    if (!existing) {
      await prisma.experience.create({ data: exp });
    } else {
      await prisma.experience.update({
        where: { id: existing.id },
        data: exp,
      });
    }
  }

  console.log('Seeding technical skills...');
  for (const skill of skillsData) {
    const existing = await prisma.skill.findFirst({
      where: { name: skill.name },
    });
    if (!existing) {
      await prisma.skill.create({ data: skill });
    } else {
      await prisma.skill.update({
        where: { id: existing.id },
        data: skill,
      });
    }
  }

  console.log('Database seeded successfully!');
} catch (error) {
  console.error('Failed to seed database:', error);
  throw error;
} finally {
  await prisma.$disconnect();
}
