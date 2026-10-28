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
    title: 'SIMRS Modernization & AI Medical Record Assistant',
    slug: 'simrs-ai-bintan',
    summary:
      'Modernisasi ekosistem SIMRS RSUD Bintan berbasis React.js dengan integrasi AI pembuat draf catatan medis S.O.A.P.I.E otomatis dan bridging penuh BPJS VClaim, LIS, & PACS.',
    description: `## Modernisasi Ekosistem SIMRS & Asisten Klinis AI

Platform sistem informasi manajemen rumah sakit (SIMRS) RSUD Kabupaten Bintan yang dimodernisasi dari sistem legacy Java menjadi platform web modern responsif berbasis React.js.

### Fitur Utama:
- **AI Medical Assistant**: Integrasi model AI lokal terlatih untuk generate otomatis draf resume medis klinis format S.O.A.P.I.E bagi dokter poliklinik dan rawat inap.
- **Bridging Penuh BPJS Kesehatan**: Integrasi real-time Web Service VClaim 2.0 dan Antrean Online BPJS Kesehatan dengan penanganan failover otomatis.
- **Interoperabilitas LIS & PACS**: Integrasi otomatis mesin laboratorium darah dan sistem pengarsipan citra radiologi digital PACS.
- **High-Availability Database Server**: Arsitektur server Linux bare-metal dengan replikasi PostgreSQL dan backup berkala terenkripsi 24/7.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    thumbnailPublicId: 'portfolio/projects/simrs-thumb',
    repoUrl: 'https://github.com/elrazaq',
    techStack: ['React.js', 'REST APIs', 'PostgreSQL', 'AI/NLP', 'Linux'],
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/simrs-gallery-1',
        caption: 'Dashboard Rawat Jalan & Monitoring Antrean Poliklinik',
        sortOrder: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/simrs-gallery-2',
        caption: 'Modul Rekam Medis S.O.A.P.I.E & Asisten AI Klinis',
        sortOrder: 2,
      },
    ],
  },
  {
    title: 'Portal Beasiswa Terpadu Provinsi Kepulauan Riau',
    slug: 'beasiswa-kepri',
    summary:
      'Platform penerimaan beasiswa berbasis Next.js yang menangani pendaftaran, upload ribuan dokumen digital, dan tracking seleksi transparan mahasiswa se-Kepri selama 5 tahun.',
    description: `## Platform Seleksi Beasiswa Mahasiswa Provinsi Kepri

Sistem informasi terintegrasi bagi Biro Kesejahteraan Rakyat (Kesra) Sekretariat Daerah Provinsi Kepulauan Riau untuk mendigitalkan seluruh tahapan seleksi beasiswa mahasiswa berprestasi dan kurang mampu di seluruh wilayah kepulauan.

### Fitur Utama:
- **High-Concurrency Document Pipeline**: Penanganan upload ribuan dokumen digital (KTP, KRS, Transkrip, Surat Keterangan) tanpa kertas (*paperless*).
- **Automated Verification Engine**: Sistem scoring dan validasi berkas otomatis sesuai kuota kabupaten/kota dan kriteria jenjang D3/S1/S2.
- **Live Status Tracking**: Portal transparansi bagi pendaftar untuk melacak status verifikasi berkas secara real-time dari pendaftaran hingga pengumuman penerima beasiswa.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    thumbnailPublicId: 'portfolio/projects/beasiswa-thumb',
    repoUrl: 'https://github.com/elrazaq',
    techStack: ['Next.js', 'React.js', 'Document Pipeline', 'Linux', 'PostgreSQL'],
    isFeatured: true,
    isPublished: true,
    sortOrder: 2,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/beasiswa-gallery-1',
        caption: 'Portal Pendaftaran & Formulir Berkas Mahasiswa',
        sortOrder: 1,
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/beasiswa-gallery-2',
        caption: 'Konsol Verifikasi Tim Penilai Biro Kesra Kepri',
        sortOrder: 2,
      },
    ],
  },
  {
    title: 'Sistem Tracking & Manajemen SP2D Satu Pintu',
    slug: 'sp2d-satu-pintu-bkad',
    summary:
      'Aplikasi pelacakan pencairan dana Surat Perintah Pencairan Dana (SP2D) terpusat untuk seluruh OPD di Kabupaten Bintan, menggantikan alur berkas manual berhari-hari menjadi real-time.',
    description: `## Otomasi Alur Verifikasi Surat Perintah Pencairan Dana

Aplikasi manajemen workflow pencairan kas daerah yang dikembangkan untuk Badan Keuangan dan Aset Daerah (BKAD) Kabupaten Bintan guna mempercepat penerbitan SP2D bagi seluruh Organisasi Perangkat Daerah (OPD).

### Fitur Utama:
- **Barcode & Tracking Satu Pintu**: Setiap berkas SPM yang masuk diberi nomor tracking unik dengan barcode untuk pemantauan posisi berkas di meja verifikator, perbendaharaan, hingga otorisasi BUD.
- **Audit Trail & SLA Monitoring**: Pencatatan durasi proses di tiap meja untuk memastikan kepatuhan Standar Pelayanan Minimal.
- **Rekonsiliasi Kas Daerah**: Integrasi laporan harian pengeluaran kas daerah untuk kelengkapan audit BPK.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    thumbnailPublicId: 'portfolio/projects/sp2d-thumb',
    repoUrl: 'https://github.com/elrazaq',
    techStack: ['PHP', 'MySQL', 'Windows Server', 'Audit Workflow'],
    isFeatured: false,
    isPublished: true,
    sortOrder: 3,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        publicId: 'portfolio/projects/sp2d-gallery-1',
        caption: 'Dashboard Tracking SP2D Real-Time OPD Bintan',
        sortOrder: 1,
      },
    ],
  },
];

const experiencesData = [
  {
    company: 'RSUD Kabupaten Bintan',
    role: 'Technical IT Support & Software Engineer',
    location: 'Kab. Bintan, Kepri',
    startDate: new Date('2021-03-01'),
    endDate: null,
    isCurrent: true,
    description:
      'Memodernisasi sistem SIMRS dari Java ke aplikasi web modern React.js dan melatih asisten AI lokal untuk auto-generate catatan klinis S.O.A.P.I.E bagi para dokter. Integrasi penuh (bridging API) dengan Web Service BPJS Kesehatan (VClaim & Antrean), LIS Laboratorium otomatis, dan PACS Radiologi digital. Membangun server database Linux dari nol dengan optimasi query transaksi medis serta sistem backup otomatis 24/7.',
    technologies: ['React.js', 'PHP/Laravel', 'REST APIs', 'PostgreSQL', 'Linux Server', 'AI Integration'],
    sortOrder: 1,
  },
  {
    company: 'Biro Kesra Provinsi Kepulauan Riau',
    role: 'Tenaga Ahli IT (Kontrak)',
    location: 'Provinsi Kepulauan Riau',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2025-12-31'),
    isCurrent: false,
    description:
      'Merancang dan membangun Portal Penerimaan Beasiswa Provinsi Kepri berbasis Next.js yang melayani ribuan mahasiswa kepulauan selama 5 tahun berturut-turut. Mengembangkan pipeline upload dan verifikasi berkas digital tanpa dokumen fisik dengan penanganan lonjakan trafik tinggi (high concurrency). Fitur pelacakan seleksi real-time dari pendaftaran hingga pengumuman penerima beasiswa secara transparan.',
    technologies: ['Next.js', 'React.js', 'Linux Server', 'Document Ingestion', 'PostgreSQL'],
    sortOrder: 2,
  },
  {
    company: 'Badan Keuangan dan Aset Daerah (BKAD) Kab. Bintan',
    role: 'Full-Stack Developer',
    location: 'Kab. Bintan, Kepri',
    startDate: new Date('2019-01-01'),
    endDate: new Date('2021-03-01'),
    isCurrent: false,
    description:
      'Membangun Sistem Pelacakan SP2D Satu Pintu untuk menggantikan proses manual verifikasi pencairan dana kas daerah seluruh OPD. Aplikasi pencatatan dan rekonsiliasi anggaran operasional kas daerah internal untuk kesiapan audit BPK. Administrasi Windows Server produksi untuk kelancaran operasional keuangan antar-bidang.',
    technologies: ['PHP', 'MySQL', 'Windows Server', 'Financial Systems'],
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

  // Clean up legacy mockup projects & experiences if present
  console.log('Cleaning up legacy mockup entries...');
  await prisma.project.deleteMany({
    where: { slug: { in: ['simrs-bintan-cloud', 'logiflow-telematics', 'keprimart-omnichannel'] } },
  });
  await prisma.experience.deleteMany({
    where: { company: { in: ['PT Solusi Digital Nusantara', 'Global Telematics Indonesia', 'Riau Health Tech Labs'] } },
  });

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
