export type Language = 'id' | 'en'

export interface ProjectItem {
  id: string
  title: string
  slug: string
  category: string
  summary: string
  impact: string
  techStack: string[]
  repoUrl: string
  isFeatured?: boolean
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  responsibilities: string[]
  techStack: string[]
}

export interface SkillCategoryGroup {
  category: string
  skills: string[]
}

export interface PortfolioContent {
  nav: {
    about: string
    experience: string
    skills: string
    projects: string
    contact: string
    admin: string
  }
  hero: {
    statusBadge: string
    greeting: string
    roles: string[]
    bio: string
    ctaProjects: string
    ctaResume: string
    yearsBadge: string
  }
  experience: {
    eyebrow: string
    title: string
    items: ExperienceItem[]
  }
  skills: {
    eyebrow: string
    title: string
    groups: SkillCategoryGroup[]
  }
  projects: {
    eyebrow: string
    title: string
    subtitle: string
    viewDetail: string
    items: ProjectItem[]
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    directContact: string
    copyEmail: string
    copied: string
    formName: string
    formEmail: string
    formMessage: string
    formSubmit: string
  }
}

export const contentData: Record<Language, PortfolioContent> = {
  id: {
    nav: {
      about: 'Tentang',
      experience: 'Pengalaman',
      skills: 'Keahlian',
      projects: 'Proyek',
      contact: 'Kontak',
      admin: 'Admin',
    },
    hero: {
      statusBadge: 'Tersedia untuk Pekerjaan',
      greeting: 'Halo, saya Abdul Razak.',
      roles: [
        'Full-Stack Software Engineer',
        'Next.js & React Specialist',
        'AI Medical Record Integrator',
        'Linux & Database Architect',
      ],
      bio: 'Sarjana Teknik Informatika dengan spesialisasi rekayasa sistem web terdistribusi, modernisasi sistem kesehatan rumah sakit (SIMRS), dan integrasi API skala regional. Mengutamakan performa Core Web Vitals, arsitektur bersih, dan keandalan data.',
      ctaProjects: 'Lihat Proyek Pilihan',
      ctaResume: 'Unduh Resume (CV)',
      yearsBadge: '5+ Thn Pengalaman Spesialis',
    },
    experience: {
      eyebrow: 'Riwayat Karir & Tanggung Jawab',
      title: 'Pengalaman Profesional',
      items: [
        {
          company: 'RSUD Kabupaten Bintan',
          role: 'Technical IT Support & Software Engineer',
          period: 'Mar 2021 — Sekarang',
          location: 'Kab. Bintan, Kepri',
          responsibilities: [
            'Memodernisasi sistem SIMRS dari Java ke aplikasi web modern React.js dan melatih asisten AI lokal untuk auto-generate catatan klinis S.O.A.P.I.E bagi para dokter.',
            'Integrasi penuh (bridging API) dengan Web Service BPJS Kesehatan (VClaim & Antrean), LIS Laboratorium otomatis, dan PACS Radiologi digital.',
            'Membangun server database Linux dari nol dengan optimasi query transaksi medis serta sistem backup otomatis 24/7.',
          ],
          techStack: ['React.js', 'PHP/Laravel', 'REST APIs', 'PostgreSQL', 'Linux Server', 'AI Integration'],
        },
        {
          company: 'Biro Kesra Provinsi Kepulauan Riau',
          role: 'Tenaga Ahli IT (Kontrak)',
          period: 'Jan 2020 — Des 2025',
          location: 'Provinsi Kepulauan Riau',
          responsibilities: [
            'Merancang dan membangun Portal Penerimaan Beasiswa Provinsi Kepri berbasis Next.js yang melayani ribuan mahasiswa kepulauan selama 5 tahun berturut-turut.',
            'Mengembangkan pipeline upload dan verifikasi berkas digital tanpa dokumen fisik dengan penanganan lonjakan trafik tinggi (high concurrency).',
            'Fitur pelacakan seleksi real-time dari pendaftaran hingga pengumuman penerima beasiswa secara transparan.',
          ],
          techStack: ['Next.js', 'React.js', 'Linux Server', 'Document Ingestion', 'PostgreSQL'],
        },
        {
          company: 'Badan Keuangan dan Aset Daerah (BKAD) Kab. Bintan',
          role: 'Full-Stack Developer',
          period: 'Jan 2019 — Mar 2021',
          location: 'Kab. Bintan, Kepri',
          responsibilities: [
            'Membangun Sistem Pelacakan SP2D Satu Pintu untuk menggantikan proses manual verifikasi pencairan dana kas daerah seluruh OPD.',
            'Aplikasi pencatatan dan rekonsiliasi anggaran operasional kas daerah internal untuk kesiapan audit BPK.',
            'Administrasi Windows Server produksi untuk kelancaran operasional keuangan antar-bidang.',
          ],
          techStack: ['PHP', 'MySQL', 'Windows Server', 'Financial Systems'],
        },
      ],
    },
    skills: {
      eyebrow: 'Kompetensi & Teknologi',
      title: 'Keahlian Rekayasa Sistem',
      groups: [
        {
          category: 'Frontend & UI Engineering',
          skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
        },
        {
          category: 'Backend & System Bridging',
          skills: ['NestJS', 'Node.js', 'PHP (Laravel)', 'Go (Golang)', 'Python', 'RESTful APIs'],
        },
        {
          category: 'Database & Cloud Storage',
          skills: ['PostgreSQL', 'Neon Serverless', 'Prisma ORM', 'MySQL', 'Cloudinary CDN'],
        },
        {
          category: 'DevOps & Infrastructure',
          skills: ['Linux Server Administration', 'Docker', 'Vercel Edge', 'Windows Server', 'Git CI/CD'],
        },
      ],
    },
    projects: {
      eyebrow: 'Selected Work & Systems Built',
      title: 'Showcase Proyek Unggulan',
      subtitle: 'Sistem operasional dan platform digital skala enterprise yang berhasil dibangun.',
      viewDetail: 'Lihat Detail & Galeri',
      items: [
        {
          id: 'simrs-ai-bintan',
          title: 'SIMRS Modernization & AI Medical Record Assistant',
          slug: 'simrs-ai-bintan',
          category: 'Healthcare & AI Engineering',
          summary:
            'Modernisasi ekosistem SIMRS RSUD Bintan berbasis React.js dengan integrasi AI pembuat draf catatan medis S.O.A.P.I.E otomatis dan bridging penuh BPJS VClaim, LIS, & PACS.',
          impact: 'Mengurangi waktu administrasi dokter hingga 40% dan meniadakan penumpukan rekam medis manual.',
          techStack: ['React.js', 'REST APIs', 'PostgreSQL', 'AI/NLP', 'Linux'],
          repoUrl: 'https://github.com/elrazaq',
          isFeatured: true,
        },
        {
          id: 'beasiswa-kepri',
          title: 'Portal Beasiswa Terpadu Provinsi Kepulauan Riau',
          slug: 'beasiswa-kepri',
          category: 'Government & High-Concurrency Web',
          summary:
            'Platform penerimaan beasiswa berbasis Next.js yang menangani pendaftaran, upload ribuan dokumen digital, dan tracking seleksi transparan mahasiswa se-Kepri selama 5 tahun.',
          impact: 'Melayani lebih dari 10.000 pendaftar dengan 100% uptime saat lonjakan pengumuman hasil.',
          techStack: ['Next.js', 'React.js', 'Document Pipeline', 'Linux', 'PostgreSQL'],
          repoUrl: 'https://github.com/elrazaq',
          isFeatured: true,
        },
        {
          id: 'sp2d-satu-pintu-bkad',
          title: 'Sistem Tracking & Manajemen SP2D Satu Pintu',
          slug: 'sp2d-satu-pintu-bkad',
          category: 'Public Finance & Workflow Automation',
          summary:
            'Aplikasi pelacakan pencairan dana Surat Perintah Pencairan Dana (SP2D) terpusat untuk seluruh OPD di Kabupaten Bintan, menggantikan alur berkas manual berhari-hari menjadi real-time.',
          impact: 'Mempersingkat siklus disposisi verifikasi anggaran daerah dari 4 hari menjadi hitungan jam.',
          techStack: ['PHP', 'MySQL', 'Windows Server', 'Audit Workflow'],
          repoUrl: 'https://github.com/elrazaq',
        },
      ],
    },
    contact: {
      eyebrow: 'Inisiasi Kolaborasi',
      title: 'Mari Membangun Solusi Bersama',
      subtitle:
        'Terbuka untuk diskusi proyek rekayasa perangkat lunak, modernisasi sistem operasional, maupun peluang kerja profesional.',
      directContact: 'Alamat Email Langsung',
      copyEmail: 'Salin Email',
      copied: 'Email Tersalin!',
      formName: 'Nama Lengkap',
      formEmail: 'Alamat Email',
      formMessage: 'Pesan / Kebutuhan Proyek',
      formSubmit: 'Kirimkan Pesan',
    },
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      admin: 'Admin',
    },
    hero: {
      statusBadge: 'Available for work',
      greeting: 'Hello, I am Abdul Razak.',
      roles: [
        'Full-Stack Software Engineer',
        'Next.js & React Specialist',
        'AI Medical Record Integrator',
        'Linux & Database Architect',
      ],
      bio: 'Informatics Engineering graduate (B.Eng / S.T.) specializing in distributed web system architectures, hospital management digitalization (SIMRS), and provincial API bridging. Dedicated to clean code, Core Web Vitals optimization, and long-term system reliability.',
      ctaProjects: 'Explore Selected Work',
      ctaResume: 'Download Resume (CV)',
      yearsBadge: '5+ Yrs Specialized Exp',
    },
    experience: {
      eyebrow: 'Career History & Responsibilities',
      title: 'Work Experience',
      items: [
        {
          company: 'RSUD Kabupaten Bintan (Bintan Regional Public Hospital)',
          role: 'Technical IT Support & Software Engineer',
          period: 'Mar 2021 — Present',
          location: 'Bintan Regency, Riau Islands',
          responsibilities: [
            'Re-engineered legacy Java SIMRS into a modern React.js web application and integrated custom AI to auto-generate clinical S.O.A.P.I.E documentation for physicians.',
            'Executed seamless API bridging with BPJS Health Web Services (VClaim & Queuing), Laboratory Information Systems (LIS), and PACS diagnostic radiology streaming.',
            'Constructed dedicated Linux database server infrastructure with query optimization and daily automated backups for 24/7 hospital data integrity.',
          ],
          techStack: ['React.js', 'PHP/Laravel', 'REST APIs', 'PostgreSQL', 'Linux Server', 'AI Integration'],
        },
        {
          company: 'Biro Kesra Provinsi Kepulauan Riau (Public Welfare Bureau)',
          role: 'IT Specialist (Contract)',
          period: 'Jan 2020 — Dec 2025',
          location: 'Riau Islands Province',
          responsibilities: [
            'Architected and built the official Riau Islands Provincial Scholarship Platform from the ground up using Next.js, serving thousands of higher education applicants over a 5-year tenure.',
            'Deployed a secure, structured digital document ingestion pipeline allowing evaluation committees to audit applicant dossiers online without paper records.',
            'Delivered high-concurrency Linux database management maintaining uninterrupted uptime during intense registration and award release traffic spikes.',
          ],
          techStack: ['Next.js', 'React.js', 'Linux Server', 'Document Ingestion', 'PostgreSQL'],
        },
        {
          company: 'Badan Keuangan dan Aset Daerah (BKAD) Kab. Bintan',
          role: 'Full-Stack Developer',
          period: 'Jan 2019 — Mar 2021',
          location: 'Bintan Regency, Riau Islands',
          responsibilities: [
            'Engineered a centralized "One-Door" tracking portal for Fund Disbursement Orders (SP2D) used across all regional government agencies (OPD) in Bintan Regency.',
            'Built internal financial reporting tools to reconcile and record operational budget expenditures for audit-ready compliance.',
            'Administered Windows Server production environments guaranteeing reliable access for financial operators across all divisions.',
          ],
          techStack: ['PHP', 'MySQL', 'Windows Server', 'Financial Systems'],
        },
      ],
    },
    skills: {
      eyebrow: 'Competencies & Tools',
      title: 'Technical Capabilities',
      groups: [
        {
          category: 'Frontend & UI Engineering',
          skills: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
        },
        {
          category: 'Backend & System Bridging',
          skills: ['NestJS', 'Node.js', 'PHP (Laravel)', 'Go (Golang)', 'Python', 'RESTful APIs'],
        },
        {
          category: 'Database & Cloud Storage',
          skills: ['PostgreSQL', 'Neon Serverless', 'Prisma ORM', 'MySQL', 'Cloudinary CDN'],
        },
        {
          category: 'DevOps & Infrastructure',
          skills: ['Linux Server Administration', 'Docker', 'Vercel Edge', 'Windows Server', 'Git CI/CD'],
        },
      ],
    },
    projects: {
      eyebrow: 'Selected Work & Systems Built',
      title: 'Featured Systems Showcase',
      subtitle: 'Enterprise operational architectures and high-impact digital platforms shipped to production.',
      viewDetail: 'View Detail & Architecture',
      items: [
        {
          id: 'simrs-ai-bintan',
          title: 'SIMRS Modernization & AI Medical Record Assistant',
          slug: 'simrs-ai-bintan',
          category: 'Healthcare & AI Engineering',
          summary:
            'Full modernization of RSUD Bintan hospital management platform to React.js, featuring an embedded AI assistant auto-generating clinical S.O.A.P.I.E notes and full BPJS/LIS/PACS bridging.',
          impact: 'Cut physician clinical charting time by 40% and eradicated manual record backlogs.',
          techStack: ['React.js', 'REST APIs', 'PostgreSQL', 'AI/NLP', 'Linux'],
          repoUrl: 'https://github.com/elrazaq',
          isFeatured: true,
        },
        {
          id: 'beasiswa-kepri',
          title: 'Riau Islands Provincial Scholarship Platform',
          slug: 'beasiswa-kepri',
          category: 'Government & High-Concurrency Web',
          summary:
            'A province-scale Next.js portal managing end-to-end online registrations, verification of tens of thousands of student digital documents, and live stage tracking for 5 consecutive years.',
          impact: 'Processed over 10,000 student applicants with 100% server availability during announcement surges.',
          techStack: ['Next.js', 'React.js', 'Document Pipeline', 'Linux', 'PostgreSQL'],
          repoUrl: 'https://github.com/elrazaq',
          isFeatured: true,
        },
        {
          id: 'sp2d-satu-pintu-bkad',
          title: 'Centralized Regional SP2D Tracking Portal',
          slug: 'sp2d-satu-pintu-bkad',
          category: 'Public Finance & Workflow Automation',
          summary:
            'Automated Fund Disbursement Order (SP2D) tracking portal replacing paper handoffs across all municipal agencies in Bintan with real-time status and audit-ready logging.',
          impact: 'Accelerated municipal fund disbursement review cycles from 4 business days to mere hours.',
          techStack: ['PHP', 'MySQL', 'Windows Server', 'Audit Workflow'],
          repoUrl: 'https://github.com/elrazaq',
        },
      ],
    },
    contact: {
      eyebrow: 'Initiate Collaboration',
      title: "Let's Build Impactful Systems",
      subtitle:
        'Open to discussing software engineering roles, enterprise system modernizations, or strategic technical collaborations.',
      directContact: 'Direct Email Address',
      copyEmail: 'Copy Email',
      copied: 'Email Copied!',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formMessage: 'Message / Project Scope',
      formSubmit: 'Send Message',
    },
  },
}
