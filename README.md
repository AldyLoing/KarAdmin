# 📋 KarAdmin - Sistem Administrasi Perkantoran

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Aplikasi manajemen administrasi perkantoran modern berbasis web dengan antarmuka intuitif dan fitur lengkap.**

[🚀 Quick Start](#-quick-start) • [📖 Dokumentasi](#-dokumentasi) • [✨ Fitur](#-fitur-lengkap) • [🛠️ Teknologi](#️-teknologi)

</div>

---

## 📸 Preview

<div align="center">
  <img src="https://via.placeholder.com/800x400/1e293b/ffffff?text=KarAdmin+Dashboard+Preview" alt="Dashboard Preview" />
  <p><em>Dashboard dengan statistik real-time dan navigasi intuitif</em></p>
</div>

## 🎯 Tentang Project

KarAdmin adalah sistem administrasi perkantoran yang dirancang untuk mempermudah pengelolaan dokumen, keuangan, dan data pegawai. Dibangun dengan teknologi modern untuk memberikan performa optimal dan pengalaman pengguna yang excellent.

### 🎁 Mengapa KarAdmin?

- ⚡ **Performa Tinggi** - Menggunakan Next.js 14 dengan App Router dan Server Components
- 🔒 **Keamanan Terjamin** - Row Level Security (RLS) di tingkat database
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat
- 🎨 **UI Modern** - Menggunakan shadcn/ui dan Tailwind CSS
- 🚀 **Easy Deploy** - Deploy ke Vercel dalam hitungan menit
- 📁 **File Management** - Upload dan kelola dokumen dengan Supabase Storage

## ✨ Fitur Lengkap

### 🔐 Autentikasi & Keamanan
- Login dan registrasi dengan Supabase Auth
- Protected routes dengan middleware Next.js
- Session management otomatis dengan cookies
- Row Level Security (RLS) untuk keamanan data
- Email verification (dapat diaktifkan/dinonaktifkan)

### 📊 Dashboard Interaktif
- **Statistik Real-time** dari semua modul
- **Ringkasan Keuangan** dengan total pemasukan, pengeluaran, dan saldo
- **Aktivitas Terbaru** surat masuk dan keluar
- **Cards Informatif** dengan icon dari Lucide React
- **Auto Refresh** data untuk informasi terkini

### 📬 Manajemen Surat Masuk
- ✅ CRUD lengkap (Create, Read, Update, Delete)
- ✅ Upload file PDF hingga 50MB
- ✅ Pencarian real-time berdasarkan nomor/perihal
- ✅ Format tanggal Indonesia (contoh: 19 November 2025)
- ✅ Confirmation dialog sebelum hapus data
- ✅ Download/view dokumen langsung dari aplikasi

### 📤 Manajemen Surat Keluar
- ✅ CRUD lengkap dengan validasi form
- ✅ Upload dan download file PDF
- ✅ Pencarian dan filtering data
- ✅ Tracking nomor surat otomatis
- ✅ Toast notification untuk setiap aksi

### 💰 Manajemen Keuangan
- ✅ Pencatatan pemasukan dan pengeluaran
- ✅ Filter transaksi per bulan (dropdown)
- ✅ Perhitungan saldo otomatis
- ✅ Kategori transaksi (Pemasukan/Pengeluaran)
- ✅ Format mata uang Rupiah (IDR)
- ✅ Summary card: Total Pemasukan, Pengeluaran, Saldo

### 📁 Manajemen Arsip
- ✅ Penyimpanan dokumen terpusat
- ✅ Upload file PDF ke Supabase Storage
- ✅ Kategorisasi dokumen (Surat, Laporan, Kontrak, Lainnya)
- ✅ Pencarian dan filtering berdasarkan kategori
- ✅ Download dokumen arsip dengan satu klik

### 👥 Manajemen Pegawai
- ✅ Data lengkap pegawai (NIP, Nama, Jabatan, Unit Kerja, Kontak)
- ✅ Upload foto pegawai (JPG/PNG) hingga 5MB
- ✅ Preview foto circular 48x48px di tabel
- ✅ Detail view pegawai dalam modal dialog
- ✅ Pencarian real-time berdasarkan nama/NIP
- ✅ Placeholder icon untuk pegawai tanpa foto

## 🛠️ Teknologi

### Frontend Stack
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **Next.js** | 14.1.0 | React framework dengan App Router dan Server Components |
| **TypeScript** | 5.x | Type safety dan better developer experience |
| **Tailwind CSS** | 3.3.0 | Utility-first CSS framework untuk styling cepat |
| **shadcn/ui** | Latest | Komponen UI dengan Radix UI primitives |
| **Lucide React** | 0.323.0 | Beautiful & consistent icon library |
| **date-fns** | 3.3.1 | Modern JavaScript date utility library |

### Backend & Database
| Teknologi | Fitur |
|-----------|-------|
| **Supabase** | PostgreSQL Database dengan Row Level Security |
| | Authentication (Email/Password) |
| | Storage untuk file upload (Photos & Documents) |
| | Real-time subscriptions |
| **@supabase/ssr** | 0.5.2 - SSR support untuk Next.js dengan cookie handling |

### Development Tools
- **ESLint** - Code linting untuk quality control
- **PostCSS** - CSS transformations
- **Autoprefixer** - Vendor prefixing otomatis

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x atau lebih baru
- npm atau yarn
- Akun Supabase (gratis)
- Git

### Instalasi Cepat (5 Menit)

```bash
# 1. Clone repository
git clone https://github.com/AldyLoing/KarAdmin.git
cd KarAdmin

# 2. Install dependencies
npm install

# 3. Setup environment variables
copy .env.example .env.local
# Edit .env.local dengan Supabase credentials Anda

# 4. Jalankan development server
npm run dev
```

🎉 Aplikasi berjalan di **http://localhost:3000**

> **💡 Catatan:** Anda perlu setup Supabase terlebih dahulu. Lihat [INSTALLATION.md](INSTALLATION.md) untuk panduan lengkap.

## 📖 Dokumentasi

Kami menyediakan dokumentasi lengkap untuk membantu Anda:

| Dokumen | Deskripsi |
|---------|-----------|
| **[INSTALLATION.md](INSTALLATION.md)** | 📘 Panduan instalasi lengkap step-by-step |
| **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** | 🗄️ Setup database dan storage Supabase |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | 🚀 Deploy ke Vercel (CLI & Dashboard) |
| **[QUICKSTART.md](QUICKSTART.md)** | ⚡ Quick start dalam 5 menit |
| **[CHANGELOG.md](CHANGELOG.md)** | 📝 Version history dan updates |

## 📂 Struktur Project

```
KarAdmin/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (dashboard)/             # Dashboard layout group
│   │   ├── 📁 dashboard/           # 📊 Dashboard page
│   │   ├── 📁 surat-masuk/         # 📬 Surat Masuk CRUD
│   │   ├── 📁 surat-keluar/        # 📤 Surat Keluar CRUD
│   │   ├── 📁 keuangan/            # 💰 Transaksi Keuangan
│   │   ├── 📁 arsip/               # 📁 Manajemen Arsip
│   │   ├── 📁 pegawai/             # 👥 Data Pegawai
│   │   └── 📄 layout.tsx           # Layout dengan sidebar
│   ├── 📁 login/                   # 🔐 Login page
│   ├── 📁 register/                # ✍️ Register page
│   └── 📄 globals.css              # 🎨 Global styles
├── 📁 components/ui/               # 🧩 shadcn/ui components (17 files)
├── 📁 lib/                         # 🔧 Utilities & helpers
│   ├── 📁 supabase/                # Supabase clients
│   └── 📄 utils.ts                 # Helper functions
├── 📄 middleware.ts                # 🛡️ Route protection
├── 📄 supabase-schema.sql          # 🗄️ Database schema
├── 📄 fix-rls-policies.sql         # 🔒 RLS policies fix
├── 📄 fix-storage-policies.sql     # 📦 Storage policies fix
└── 📄 package.json                 # Dependencies
```

## 🗄️ Database Schema

### Tabel (5)
1. **employees** - Data pegawai dengan foto
2. **transactions** - Transaksi keuangan
3. **incoming_letters** - Surat masuk dengan file PDF
4. **outgoing_letters** - Surat keluar dengan file PDF
5. **archives** - Arsip dokumen dengan kategorisasi

### Storage Buckets (2)
- **photos** - Foto pegawai (JPG/PNG, max 5MB)
- **documents** - Dokumen surat/arsip (PDF, max 50MB)

## 🔧 Troubleshooting

<details>
<summary><strong>Error: "Email not confirmed"</strong></summary>

**Solusi:**
1. Buka **Supabase Dashboard** → **Authentication** → **Providers**
2. Matikan toggle **"Confirm email"**
3. Atau confirm manual user di **Authentication** → **Users**
</details>

<details>
<summary><strong>Error: "new row violates row-level security policy"</strong></summary>

**Solusi:**
1. Run file `fix-rls-policies.sql` di SQL Editor
2. Pastikan user sudah login (authenticated)
</details>

<details>
<summary><strong>Error saat upload file</strong></summary>

**Solusi:**
1. Run file `fix-storage-policies.sql` di SQL Editor
2. Confirm saat warning "destructive operation"
3. Verify buckets `photos` dan `documents` ada dan Public
</details>

<details>
<summary><strong>Login berhasil tapi tidak redirect</strong></summary>

**Solusi:**
1. Clear browser cache dan cookies
2. Restart dev server (`Ctrl+C` lalu `npm run dev`)
3. Pastikan `@supabase/ssr` sudah terinstall
</details>

## 🌐 Deploy ke Production

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AldyLoing/KarAdmin)

Atau manual:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Jangan lupa tambahkan environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Lihat [DEPLOYMENT.md](DEPLOYMENT.md) untuk panduan lengkap.

## 🤝 Contributing

Kontribusi selalu welcome! Cara berkontribusi:

1. Fork repository ini
2. Buat branch fitur: `git checkout -b fitur-baru`
3. Commit changes: `git commit -m "✨ Tambah fitur X"`
4. Push ke branch: `git push origin fitur-baru`
5. Buat Pull Request

### Commit Convention
Gunakan emoji untuk commit message:
- ✨ `:sparkles:` - Fitur baru
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Dokumentasi
- 🎨 `:art:` - UI/UX improvement
- ⚡ `:zap:` - Performance
- 🔒 `:lock:` - Security

## 📊 Project Stats

- **Total Files:** 60+ files
- **Components:** 17 shadcn/ui components
- **Pages:** 7 pages (Dashboard + 5 modules + Auth)
- **Database Tables:** 5 tables
- **Storage Buckets:** 2 buckets
- **Lines of Code:** 12,000+ LOC

## 📝 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 👨‍💻 Author

**Aldy Loing**

- 🐙 GitHub: [@AldyLoing](https://github.com/AldyLoing)
- 📦 Repository: [KarAdmin](https://github.com/AldyLoing/KarAdmin)

## 🙏 Acknowledgments

Terima kasih kepada:

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Lucide](https://lucide.dev/) - Beautiful & Consistent Icons
- [Vercel](https://vercel.com/) - Platform for Frontend Developers

## 📈 Roadmap

- [ ] Multi-language support (ID/EN)
- [ ] Dark mode
- [ ] Export data ke Excel/PDF
- [ ] Email notifications
- [ ] Activity logs
- [ ] Role-based access control
- [ ] Mobile app (React Native)

## 💬 Support

Butuh bantuan? Ada beberapa cara:

- 📖 Baca [dokumentasi lengkap](INSTALLATION.md)
- 🐛 Laporkan bug di [Issues](https://github.com/AldyLoing/KarAdmin/issues)
- 💡 Request fitur di [Discussions](https://github.com/AldyLoing/KarAdmin/discussions)
- ⭐ Star repository jika project ini membantu!

---

<div align="center">

**⭐ Jika project ini bermanfaat, berikan star!**

Made with ❤️ by [Aldy Loing](https://github.com/AldyLoing)

</div>
