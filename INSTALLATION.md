# Langkah Instalasi dan Menjalankan Project

## Prerequisites yang Harus Diinstall

1. **Node.js** (versi 18.x atau lebih baru)
   - Download dari: https://nodejs.org/
   - Verify instalasi: `node --version`

2. **Git** (opsional, untuk clone repository)
   - Download dari: https://git-scm.com/

3. **Akun Supabase** (gratis)
   - Daftar di: https://supabase.com

## Step-by-Step Installation

### Step 1: Setup Project

```bash
# Masuk ke folder project
cd e:\Orders\Project\KarAdmin

# Install semua dependencies
npm install
```

Tunggu hingga proses selesai (biasanya 2-5 menit tergantung koneksi internet).

### Step 2: Setup Supabase

Ikuti instruksi lengkap di file `SUPABASE_SETUP.md`.

Ringkasannya:
1. Buat project di Supabase
2. Jalankan SQL dari file `supabase-schema.sql`
3. Buat 2 storage buckets: `documents` dan `photos`
4. Copy Project URL dan API Key

### Step 3: Setup Environment Variables

```bash
# Copy file example
copy .env.example .env.local

# Edit file .env.local dengan text editor
# Isi dengan credentials Supabase Anda
```

Isi `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx.xxxxx.xxxxx
```

### Step 4: Jalankan Development Server

```bash
npm run dev
```

Setelah muncul pesan:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in xxxms
```

Buka browser dan akses: **http://localhost:3000**

### Step 5: Register Account Pertama

1. Buka http://localhost:3000
2. Klik "Daftar di sini" atau akses langsung ke `/register`
3. Isi email dan password
4. Klik "Daftar"
5. Login dengan akun yang baru dibuat

## Struktur Folder Project

```
KarAdmin/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard layout group
│   │   ├── dashboard/           # Dashboard page
│   │   ├── surat-masuk/         # Surat Masuk module
│   │   ├── surat-keluar/        # Surat Keluar module
│   │   ├── keuangan/            # Keuangan module
│   │   ├── arsip/               # Arsip module
│   │   ├── pegawai/             # Pegawai module
│   │   └── layout.tsx           # Dashboard layout (sidebar + navbar)
│   ├── login/                   # Login page
│   ├── register/                # Register page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (redirect)
├── components/
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── table.tsx
│       └── ...                  # dan lain-lain
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Supabase client
│   │   ├── server.ts            # Supabase server client
│   │   └── storage.ts           # File upload helpers
│   └── utils.ts                 # Utility functions
├── middleware.ts                # Route protection
├── supabase-schema.sql          # Database schema
├── .env.example                 # Environment variables example
├── .env.local                   # Your local env (jangan di-commit!)
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies

```

## Command yang Tersedia

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

## Troubleshooting

### Error saat `npm install`

**Problem**: "npm ERR! code ERESOLVE"

**Solution**:
```bash
npm install --legacy-peer-deps
```

### Error: "Cannot find module 'next'"

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Supabase client error"

**Solution**:
- Cek apakah `.env.local` sudah dibuat dan diisi dengan benar
- Pastikan tidak ada spasi atau karakter aneh di API keys
- Restart development server (`Ctrl+C` lalu `npm run dev` lagi)

### Port 3000 sudah digunakan

**Solution**:
```bash
# Gunakan port lain
npm run dev -- -p 3001
```

Atau matikan aplikasi yang menggunakan port 3000.

### Browser tidak bisa akses localhost:3000

**Solution**:
- Pastikan firewall tidak memblock port 3000
- Coba akses dari browser lain
- Cek apakah dev server benar-benar running (lihat terminal)

### Error saat upload file

**Solution**:
- Pastikan storage buckets sudah dibuat di Supabase
- Cek apakah buckets di-set sebagai Public
- Verify nama bucket: `documents` dan `photos` (huruf kecil semua)

## Next Steps Setelah Berhasil Running

1. **Test semua fitur**:
   - Register & Login ✓
   - Tambah data di semua modul ✓
   - Upload file ✓
   - Search & filter ✓
   - Edit & Delete ✓

2. **Customize sesuai kebutuhan**:
   - Edit warna di `tailwind.config.ts`
   - Tambah field jika perlu
   - Modify layout sesuai preferensi

3. **Deploy ke production**:
   - Ikuti panduan di `DEPLOYMENT.md`
   - Deploy ke Vercel (gratis)

## Butuh Bantuan?

- Baca dokumentasi lengkap di `README.md`
- Setup Supabase: lihat `SUPABASE_SETUP.md`
- Deployment guide: lihat `DEPLOYMENT.md`
- Quick start: lihat `QUICKSTART.md`

---

**Happy Coding! 🚀**
