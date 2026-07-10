import type { Cv } from "@/types/cv";

export const cv: Cv = {
  profile: {
    name: "Farhan Reninda Budiansyah",
    title: "Android Developer",
    tagline:
      "Android Developer dengan pengalaman membangun aplikasi Android berbasis Kotlin, integrasi REST API, serta maintenance backend dan database MySQL untuk kebutuhan bisnis.",
    about: [
      "Saya berfokus membangun aplikasi Android yang stabil, mudah digunakan, dan sesuai dengan kebutuhan operasional bisnis.",
      "Dalam pekerjaan, saya terbiasa menerjemahkan requirement menjadi fitur: merancang alur, integrasi REST API, mengelola data lokal, hingga melakukan maintenance setelah aplikasi rilis.",
      "Saya juga memahami dasar backend menggunakan Node.js dan PHP, sehingga lebih mudah membaca alur data, berdiskusi dengan tim backend, dan melihat produk secara lebih utuh.",
    ],
    aboutFocus: [
      {
        label: "01",
        title: "Requirement",
        description: "Membaca kebutuhan dan menerjemahkannya menjadi alur fitur.",
      },
      {
        label: "02",
        title: "Integrasi",
        description: "Menghubungkan aplikasi dengan REST API dan data lokal.",
      },
      {
        label: "03",
        title: "Maintenance",
        description: "Menjaga aplikasi tetap stabil setelah digunakan.",
      },
    ],
    social: {
      email: "farhanreninda0456@gmail.com",
      phone: "+62 895-3325-36530",
      whatsapp: "62895332536530",
      linkedin: "https://www.linkedin.com/in/farhan-reninda-budiansyah-543b05197/",
      github: "https://github.com/farhanreninda",
      location: "Bekasi, Jawa Barat, Indonesia",
      cvUrl: "/CV.pdf",
    },
  },
  skills: [
    {
      category: "Bahasa & Framework",
      description: "Fondasi teknis yang saya gunakan untuk membangun logika aplikasi, kebutuhan web sederhana, dan komunikasi teknis lintas tim.",
      items: [
        { name: "Kotlin" },
        { name: "Java" },
        { name: "PHP" },
        { name: "Node.js" },
        { name: "Vue.js" },
        { name: "HTML & CSS" },
      ],
    },
    {
      category: "Mobile Development",
      description: "Area utama saya untuk membangun aplikasi Android, menghubungkan API, dan mengelola data lokal agar aplikasi nyaman digunakan.",
      items: [
        { name: "Android SDK" },
        { name: "Retrofit" },
        { name: "Room" },
        { name: "GreenDAO" },
      ],
    },
    {
      category: "Database & Integrasi API",
      description: "Dukungan untuk membaca alur data, melakukan integrasi REST API, dan mengelola database yang digunakan aplikasi.",
      items: [
        { name: "REST API Integration" },
        { name: "MySQL" },
        { name: "phpMyAdmin" },
        { name: "DBeaver" },
        { name: "DataGrip" },
      ],
    },
    {
      category: "Tools Pengembangan",
      description: "Tools yang membantu proses coding, version control, kolaborasi desain, dan pengembangan aplikasi Android.",
      items: [
        { name: "Android Studio" },
        { name: "Git & GitHub" },
        { name: "Figma (kolaborasi UI/UX)" },
        { name: "VS Code" },
      ],
    },
  ],
  experiences: [
    {
      type: "work",
      role: "Android Developer",
      company: "PT. Pitjarus Teknologi",
      start: "Februari 2023",
      end: "Sekarang",
      bullets: [
        "Membuat aplikasi Android menggunakan bahasa pemrograman Kotlin.",
        "Merancang dan membangun aplikasi perusahaan klien.",
        "Melakukan maintenance aplikasi setelah selesai dikembangkan.",
        "Melakukan maintenance backend aplikasi.",
        "Melakukan maintenance database MySQL.",
      ],
    },
    {
      type: "work",
      role: "Android Developer",
      company: "PT. Mitra Karsa Utama",
      start: "November 2021",
      end: "Februari 2023",
      bullets: [
        "Membuat aplikasi Android menggunakan bahasa pemrograman Kotlin.",
        "Merancang dan membangun aplikasi internal dan eksternal perusahaan.",
        "Melakukan maintenance aplikasi setelah selesai dikembangkan.",
      ],
    },
    {
      type: "internship",
      role: "Android Developer",
      company: "Pustaka Rifqi Group",
      start: "Januari 2021",
      end: "Juli 2021",
      bullets: [
        "Membuat aplikasi Android menggunakan bahasa pemrograman Kotlin.",
        "Membuat halaman admin untuk manajemen data dan halaman pelanggan untuk pemasaran buku.",
        "Berkolaborasi dengan UI/UX Designer.",
      ],
    },
    {
      type: "internship",
      role: "Backend Developer",
      company: "Layanan Kerja Praktek Magang Fakultas Ilmu Terapan",
      start: "November 2020",
      end: "Mei 2021",
      bullets: [
        "Membuat backend website untuk kebutuhan administrasi mahasiswa menggunakan Laravel.",
        "Berkolaborasi dengan frontend developer dan UI/UX Designer.",
      ],
    },
    {
      type: "internship",
      role: "Android Developer",
      company: "Baker's Corner Telkom University",
      start: "Juli 2020",
      end: "Agustus 2020",
      bullets: [
        "Mengembangkan aplikasi Android menggunakan bahasa pemrograman Kotlin.",
        "Mengembangkan aplikasi Android untuk manajemen data makanan pastry.",
        "Berkolaborasi dengan developer lain.",
      ],
    },
    {
      type: "organization",
      role: "Koordinator II Internal Governance",
      company: "Students Association",
      start: "Februari 2020",
      end: "Januari 2021",
      bullets: [
        "Bertanggung jawab merumuskan dan menegakkan aturan terkait kode etik di Students Association.",
      ],
    },
    {
      type: "organization",
      role: "Android Development Laboratory",
      company: "Chevalier SAS Laboratory",
      start: "Oktober 2019",
      end: "Oktober 2020",
      bullets: [
        "Mempelajari algoritma Android Development menggunakan Kotlin.",
      ],
    },
    {
      type: "organization",
      role: "Kepala Bidang Kaderisasi Fakultas Ilmu Terapan",
      company: "Al-Fath Telkom University",
      start: "Januari 2020",
      end: "Januari 2021",
      bullets: [
        "Memimpin bidang kaderisasi yang terdiri dari 4 staf.",
        "Bertanggung jawab mengawasi, mengevaluasi, serta mengembangkan soft skill dan hard skill anggota.",
      ],
    },
    {
      type: "organization",
      role: "Asisten Praktikum Sistem Basis Data",
      company: "Applied Science School Practicum Assistant",
      start: "Januari 2020",
      end: "April 2020",
      bullets: [
        "Mengajar lebih dari 30 mahasiswa di setiap kelas tentang sistem basis data.",
        "Membuat rekap nilai praktikum mingguan seluruh kelas untuk diberikan kepada dosen sebagai nilai akhir.",
      ],
    },
    {
      type: "organization",
      role: "Equipment and Decoration Division",
      company: "Mahasiswa Telkom Purwakarta Roadshow 2020",
      start: "September 2019",
      end: "Januari 2020",
      bullets: [
        "Menyiapkan kebutuhan dekorasi selama acara berlangsung.",
      ],
    },
  ],
  projects: [
    {
      name: "Sistem Informasi Penjualan",
      category: "Web Application",
      badge: "Website",
      period: "",
      description: "Sistem informasi penjualan berbasis web untuk mengelola pesanan, transaksi kasir, menu, laporan, dan alur pemesanan pelanggan.",
      tech: ["JavaScript", "HTML", "CSS", "Node.js", "MySQL"],
      thumbnail: "/projects/sip/cover.png",
      images: [
        "/projects/sip/detail-01.png",
        "/projects/sip/detail-02.png",
        "/projects/sip/detail-03.png",
        "/projects/sip/detail-04.png",
        "/projects/sip/detail-05.png",
        "/projects/sip/detail-06.png",
        "/projects/sip/detail-07.png",
        "/projects/sip/detail-08.png",
        "/projects/sip/detail-09.png",
        "/projects/sip/detail-10.png",
        "/projects/sip/detail-11.png",
        "/projects/sip/detail-12.png",
      ],
      link: "https://farhanreninda.my.id/SIP/",
    },
    {
      name: "Redmimo Application",
      category: "Android Application",
      badge: "Android",
      period: "November 2021 - Februari 2022",
      description: "Aplikasi eksternal PT. Mitra Karsa Utama untuk absensi, pengajuan cuti, dan pencatatan aktivitas karyawan.",
      tech: ["Kotlin", "Android", "REST API"],
      thumbnail: "/projects/redmimo.jpg",
      demoUrl: "https://youtu.be/uIsHRggp2to?si=XkHfOxcmuo23mpTd",
    },
    {
      name: "Mimo Application",
      category: "Android Application",
      badge: "Android",
      period: "November 2021 - Februari 2022",
      description: "Aplikasi internal PT. Mitra Karsa Utama untuk mendukung operasional harian dan koordinasi tim.",
      tech: ["Kotlin", "Android", "REST API"],
      thumbnail: "/projects/mimo.jpg",
      demoUrl: "https://youtu.be/nsAincq6WfQ",
    },
    {
      name: "Pustaka Rifqi Application",
      category: "Android Application",
      badge: "Android",
      period: "Januari 2021 - Juli 2021",
      description: "Aplikasi Android untuk pengelolaan data, pemasaran buku, dan alur pemesanan produk Pustaka Rifqi Group.",
      tech: ["Kotlin", "Android", "Firebase Database"],
      thumbnail: "/projects/pustaka-rifqi.jpg",
      demoUrl: "https://youtu.be/m2LVBupNREA",
    },
    {
      name: "Baker's Corner Admin",
      category: "Android Application",
      badge: "Android",
      period: "Juli 2020 - Agustus 2020",
      description: "Aplikasi Android untuk pengelolaan data produk pastry di Baker's Corner Telkom University.",
      tech: ["Kotlin", "Android", "Firebase Database"],
      thumbnail: "/projects/bakers-corner.jpg",
    },
    {
      name: "Nyatet App",
      category: "Android Application",
      badge: "Android",
      period: "September 2020 - Desember 2020",
      description: "Aplikasi diary dan jurnal sederhana untuk mencatat aktivitas harian secara personal.",
      tech: ["Kotlin", "Android", "REST API"],
      thumbnail: "/projects/nyatet.jpg",
      playUrl: "https://play.google.com/store/apps/details?id=org.d3ifcool.nyatet&hl=id",
    },
    {
      name: "Website LKM FIT",
      category: "Website",
      badge: "Website",
      period: "November 2020 - Mei 2021",
      description: "Website administrasi kerja praktik dan magang untuk mahasiswa, dosen, dan pihak LKM Fakultas Ilmu Terapan.",
      tech: ["Laravel", "PHP", "MySQL"],
      thumbnail: "/projects/lkm-fit.jpg",
    },
    {
      name: "Rental Mobil App",
      category: "Desktop Application",
      badge: "Desktop",
      period: "September 2019 - Desember 2019",
      description: "Aplikasi desktop untuk mengelola penyewaan mobil, data pelanggan, durasi sewa, dan transaksi.",
      tech: ["Desktop"],
      thumbnail: "/projects/rental-mobil.jpg",
    },
    {
      name: "Humanity.id",
      category: "Website",
      badge: "Website",
      period: "Januari 2019 - April 2019",
      description: "Website donasi untuk membantu proses penggalangan bantuan kepada pihak yang membutuhkan.",
      tech: ["Web"],
      thumbnail: "/projects/humanity.jpg",
    },
  ],
  certificates: [
    {
      name: "Android Application Class",
      issuer: "Dicoding Academy",
      period: "2019 - 2022",
    },
    {
      name: "Basic Web Programming",
      issuer: "Dicoding Academy",
      period: "2019 - 2022",
    },
  ],
  educations: [
    {
      school: "Universitas Terbuka",
      major: "Sistem Informasi",
      period: "Lulus 2026",
      note: "Memperkuat fondasi sistem informasi, analisis kebutuhan, dan pengembangan produk digital.",
    },
    {
      school: "Telkom University",
      major: "Rekayasa Perangkat Lunak Aplikasi",
      period: "Lulus",
      gpa: "3.55 (Cumlaude)",
    },
    {
      school: "SMK Negeri 3 Purwakarta",
      major: "Teknik Komputer dan Jaringan",
      period: "Lulus",
    },
  ],
};

export const cvId = cv;

export const cvEn: Cv = {
  profile: {
    ...cv.profile,
    title: "Android Developer",
    tagline:
      "Android Developer experienced in building Kotlin-based Android apps, REST API integration, and maintaining backend flows and MySQL databases for business needs.",
    about: [
      "I focus on building Android applications that are stable, easy to use, and aligned with business operations.",
      "In day-to-day work, I translate requirements into features: planning user flows, integrating REST APIs, managing local data, and maintaining apps after release.",
      "I also understand backend fundamentals with Node.js and PHP, which helps me read data flows, collaborate with backend teams, and view products end to end.",
    ],
    aboutFocus: [
      {
        label: "01",
        title: "Requirements",
        description: "Translate business needs into clear application flows.",
      },
      {
        label: "02",
        title: "Integration",
        description: "Connect Android apps with REST APIs and local data.",
      },
      {
        label: "03",
        title: "Maintenance",
        description: "Keep applications stable after they are released.",
      },
    ],
    social: {
      ...cv.profile.social,
      location: "Bekasi, West Java, Indonesia",
    },
  },
  skills: [
    {
      category: "Languages & Frameworks",
      description: "Core technologies I use to build application logic, simple web needs, and cross-team technical communication.",
      items: cv.skills[0].items,
    },
    {
      category: "Mobile Development",
      description: "My main area for building Android apps, connecting APIs, and managing local data so the app feels reliable in daily use.",
      items: cv.skills[1].items,
    },
    {
      category: "Database & API Integration",
      description: "Supporting tools for understanding data flows, integrating REST APIs, and managing databases used by applications.",
      items: cv.skills[2].items,
    },
    {
      category: "Development Tools",
      description: "Tools that support coding, version control, design collaboration, and Android application development.",
      items: cv.skills[3].items,
    },
  ],
  experiences: [
    {
      ...cv.experiences[0],
      start: "February 2023",
      end: "Present",
      bullets: [
        "Create Android applications using the Kotlin programming language.",
        "Design and build client company applications.",
        "Maintain applications after development is complete.",
        "Maintain backend application flows.",
        "Maintain MySQL databases.",
      ],
    },
    {
      ...cv.experiences[1],
      start: "November 2021",
      end: "February 2023",
      bullets: [
        "Create Android applications using the Kotlin programming language.",
        "Design and build internal and external company applications.",
        "Maintain applications after development is complete.",
      ],
    },
    {
      ...cv.experiences[2],
      start: "January 2021",
      end: "July 2021",
      bullets: [
        "Create Android applications using the Kotlin programming language.",
        "Create admin pages for data management and customer pages for book marketing.",
        "Collaborate with UI/UX designers.",
      ],
    },
    {
      ...cv.experiences[3],
      start: "November 2020",
      end: "May 2021",
      bullets: [
        "Create a backend website for student administration needs using Laravel.",
        "Collaborate with frontend developers and UI/UX designers.",
      ],
    },
    {
      ...cv.experiences[4],
      start: "July 2020",
      end: "August 2020",
      bullets: [
        "Develop Android applications using the Kotlin programming language.",
        "Develop an Android application for pastry food data management.",
        "Collaborate with other developers.",
      ],
    },
    {
      ...cv.experiences[5],
      role: "Coordinator II for Internal Governance",
      start: "February 2020",
      end: "January 2021",
      bullets: [
        "Formulate and enforce rules related to the code of ethics in the Students Association.",
      ],
    },
    {
      ...cv.experiences[6],
      start: "October 2019",
      end: "October 2020",
      bullets: [
        "Learn Android development algorithms using Kotlin.",
      ],
    },
    {
      ...cv.experiences[7],
      role: "Head of Cadre for the Faculty of Applied Sciences",
      start: "January 2020",
      end: "January 2021",
      bullets: [
        "Lead the cadre field, which has 4 staff members.",
        "Supervise, evaluate, and develop the soft skills and hard skills of other members.",
      ],
    },
    {
      ...cv.experiences[8],
      role: "Database Systems Practicum Assistant",
      start: "January 2020",
      end: "April 2020",
      bullets: [
        "Teach more than 30 students in each class about database systems.",
        "Prepare weekly practicum score recaps for all classes to be submitted as final scores.",
      ],
    },
    {
      ...cv.experiences[9],
      start: "September 2019",
      end: "January 2020",
      bullets: [
        "Prepare decoration needs during the event.",
      ],
    },
  ],
  projects: [
    {
      ...cv.projects[0],
      description:
        "A web-based sales information system for managing orders, cashier transactions, menus, reports, and customer ordering flows.",
    },
    {
      ...cv.projects[1],
      description:
        "An external Android application for PT. Mitra Karsa Utama to support attendance, leave requests, and employee activity reporting.",
    },
    {
      ...cv.projects[2],
      description:
        "An internal Android application for PT. Mitra Karsa Utama to support daily operations and team coordination.",
    },
    {
      ...cv.projects[3],
      description:
        "An Android application for managing data, book marketing, and product ordering flows for Pustaka Rifqi Group.",
    },
    {
      ...cv.projects[4],
      description:
        "An Android application for managing pastry product data at Baker's Corner Telkom University.",
    },
    {
      ...cv.projects[5],
      description:
        "A simple diary and journal application for recording personal daily activities.",
    },
    {
      ...cv.projects[6],
      description:
        "An administration website for practical work and internship processes for students, lecturers, and the Faculty of Applied Sciences LKM team.",
    },
    {
      ...cv.projects[7],
      description:
        "A desktop application for managing car rental data, customer records, rental duration, and transactions.",
    },
    {
      ...cv.projects[8],
      description:
        "A donation website designed to support fundraising and assistance distribution.",
    },
  ],
  certificates: cv.certificates,
  educations: [
    {
      ...cv.educations[0],
      major: "Information Systems",
      period: "Graduated 2026",
      note: "Strengthened foundations in information systems, requirement analysis, and digital product development.",
    },
    {
      ...cv.educations[1],
      major: "Applied Software Engineering",
      period: "Graduated",
      gpa: "3.55 (Cum Laude)",
    },
    {
      ...cv.educations[2],
      major: "Computer and Network Engineering",
      period: "Graduated",
    },
  ],
};

export const localizedCv: Record<"id" | "en", Cv> = {
  id: cvId,
  en: cvEn,
};

export const siteCopy = {
  id: {
    language: { label: "Ubah bahasa", current: "Bahasa Indonesia" },
    nav: {
      top: "Profil",
      skills: "Keahlian",
      experience: "Pengalaman",
      projects: "Proyek",
      education: "Pendidikan",
      contact: "Kontak",
    },
    app: {
      skip: "Lewati ke konten",
      description: "Portofolio Farhan Reninda Budiansyah, Android Developer berbasis Kotlin.",
      ogTitle: "Farhan Reninda - Portfolio",
      ogDescription: "Android Developer dengan pengalaman Kotlin, REST API, dan database MySQL.",
    },
    theme: { light: "Aktifkan mode terang", dark: "Aktifkan mode gelap" },
    hero: {
      kicker: "Halo, saya",
      headline: "Berbasis Kotlin, REST API, dan MySQL.",
    },
    about: {
      eyebrow: "Tentang Saya",
      title: "Membangun aplikasi Android yang rapi, stabil, dan mudah dipakai.",
      workflowLabel: "Fokus kerja",
      currentPosition: "Posisi Saat Ini",
      education: "Pendidikan",
      domicile: "Domisili",
    },
    skills: {
      eyebrow: "Keahlian",
      title: "Keahlian teknis untuk membangun aplikasi Android.",
      lead: "Teknologi yang saya gunakan untuk merancang fitur, menghubungkan API, mengelola data, dan menjaga proses pengembangan tetap rapi.",
    },
    experience: {
      eyebrow: "Pengalaman",
      title: "Pengalaman profesional dalam pengembangan aplikasi.",
      lead: "Riwayat kerja, proyek, dan organisasi yang relevan dengan Android development, integrasi sistem, serta kolaborasi lintas tim.",
      currentBadge: "Posisi saat ini",
      groups: {
        work: {
          title: "Pengalaman Kerja",
          description: "Peran profesional dalam pengembangan aplikasi Android untuk kebutuhan bisnis dan operasional.",
        },
        project: {
          title: "Pengalaman Magang & Proyek",
          description: "Pengalaman berbasis proyek yang memperkuat pengembangan Android, backend, dan kolaborasi UI/UX.",
        },
        organization: {
          title: "Pengalaman Organisasi",
          description: "Aktivitas pendukung yang memperkuat kepemimpinan, koordinasi, dan tanggung jawab tim.",
        },
      },
    },
    projects: {
      eyebrow: "Proyek",
      title: "Implementasi proyek dalam pengembangan aplikasi.",
      lead: "Kumpulan aplikasi yang merepresentasikan pengalaman saya dalam pengembangan mobile, pengelolaan data, integrasi sistem, dan penyelesaian kebutuhan operasional pengguna.",
      techLabel: "Teknologi",
      action: "Lihat detail",
      close: "Tutup detail proyek",
      previous: "Gambar sebelumnya",
      next: "Gambar berikutnya",
      imageAlt: "Screenshot",
      imageDots: "Daftar gambar proyek",
      showImage: "Tampilkan gambar",
      demo: "Lihat video demo",
      openPlayStore: "Buka Play Store",
      openWebsite: "Buka website",
      openProject: "Buka tautan proyek",
    },
    education: {
      eyebrow: "Pendidikan",
      title: "Riwayat pendidikan dan sertifikasi pendukung.",
      formal: "Pendidikan Formal",
      certificates: "Sertifikasi",
      gpaLabel: "IPK",
    },
    contact: {
      eyebrow: "Kontak",
      title: "Terbuka untuk diskusi project, kolaborasi, atau peluang kerja.",
      lead: "Saya siap membahas kebutuhan aplikasi, integrasi sistem, dan pengembangan produk dengan komunikasi yang jelas dan responsif.",
      actionLabel: "Aksi kontak",
      whatsappMessage: "Halo Farhan, saya ingin berdiskusi mengenai project, kolaborasi, atau peluang kerja.",
      emailSubject: "Diskusi project, kolaborasi, atau peluang kerja",
      actions: {
        email: { label: "Email", title: "Kirim Email", detail: "" },
        whatsapp: { label: "WhatsApp", title: "Chat WhatsApp", detail: "" },
        linkedin: { label: "LinkedIn", title: "Buka LinkedIn", detail: "Profil profesional" },
        github: { label: "GitHub", title: "Buka GitHub", detail: "Repository dan project" },
        cv: { label: "CV", title: "Unduh CV", detail: "Curriculum Vitae PDF" },
      },
    },
    scrollTop: { label: "Kembali ke bagian paling atas" },
    notFound: {
      title: "Halaman tidak ditemukan",
      lead: "Maaf, halaman yang kamu cari tidak ada. Coba kembali ke beranda.",
      button: "Kembali ke Beranda",
    },
  },
  en: {
    language: { label: "Change language", current: "English" },
    nav: {
      top: "Profile",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    app: {
      skip: "Skip to content",
      description: "Portfolio of Farhan Reninda Budiansyah, a Kotlin-focused Android Developer.",
      ogTitle: "Farhan Reninda - Portfolio",
      ogDescription: "Android Developer experienced with Kotlin, REST API integration, and MySQL databases.",
    },
    theme: { light: "Switch to light mode", dark: "Switch to dark mode" },
    hero: {
      kicker: "Hi, I'm",
      headline: "Kotlin, REST API, and MySQL focused.",
    },
    about: {
      eyebrow: "About Me",
      title: "Building Android applications that are stable, structured, and easy to use.",
      workflowLabel: "Work focus",
      currentPosition: "Current Role",
      education: "Education",
      domicile: "Based In",
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical capabilities for building Android applications.",
      lead: "Technologies I use to design features, connect APIs, manage data, and keep the development process organized.",
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional experience in application development.",
      lead: "Work, project, and organizational experience relevant to Android development, system integration, and cross-functional collaboration.",
      currentBadge: "Current role",
      groups: {
        work: {
          title: "Work Experience",
          description: "Professional roles focused on Android application development for business and operational needs.",
        },
        project: {
          title: "Internship & Project Experience",
          description: "Project-based experience that strengthened Android development, backend fundamentals, and UI/UX collaboration.",
        },
        organization: {
          title: "Organizational Experience",
          description: "Supporting activities that shaped leadership, coordination, and team responsibility.",
        },
      },
    },
    projects: {
      eyebrow: "Projects",
      title: "Application projects delivered across real use cases.",
      lead: "A curated set of applications that reflects my experience in mobile development, data management, system integration, and operational problem solving.",
      techLabel: "Technologies",
      action: "View details",
      close: "Close project details",
      previous: "Previous image",
      next: "Next image",
      imageAlt: "Screenshot",
      imageDots: "Project image list",
      showImage: "Show image",
      demo: "Watch demo video",
      openPlayStore: "Open Play Store",
      openWebsite: "Open website",
      openProject: "Open project link",
    },
    education: {
      eyebrow: "Education",
      title: "Education background and supporting certifications.",
      formal: "Formal Education",
      certificates: "Certifications",
      gpaLabel: "GPA",
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to project discussions, collaboration, or career opportunities.",
      lead: "I am ready to discuss application needs, system integration, and product development with clear and responsive communication.",
      actionLabel: "Contact actions",
      whatsappMessage: "Hi Farhan, I would like to discuss a project, collaboration, or career opportunity.",
      emailSubject: "Project discussion, collaboration, or career opportunity",
      actions: {
        email: { label: "Email", title: "Send Email", detail: "" },
        whatsapp: { label: "WhatsApp", title: "Chat on WhatsApp", detail: "" },
        linkedin: { label: "LinkedIn", title: "Open LinkedIn", detail: "Professional profile" },
        github: { label: "GitHub", title: "Open GitHub", detail: "Repositories and projects" },
        cv: { label: "CV", title: "Download CV", detail: "Curriculum Vitae PDF" },
      },
    },
    scrollTop: { label: "Back to top" },
    notFound: {
      title: "Page not found",
      lead: "Sorry, the page you are looking for does not exist. Please return to the homepage.",
      button: "Back to Home",
    },
  },
};
