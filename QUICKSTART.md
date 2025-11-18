# KarAdmin - Quick Start Guide

## 🚀 Memulai dalam 5 Menit

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

1. Buat account di [supabase.com](https://supabase.com)
2. Buat project baru
3. Jalankan SQL schema:
   - Buka SQL Editor di Supabase Dashboard
   - Copy paste isi file `supabase-schema.sql`
   - Klik Run

4. Buat Storage Buckets:
   - Buka Storage di Supabase Dashboard
   - Buat bucket `documents` (public)
   - Buat bucket `photos` (public)

5. Copy API Keys:
   - Settings → API
   - Copy Project URL dan anon key

### 3. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### 4. Run Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 5. Register & Login

1. Akses `/register`
2. Buat account baru
3. Login dan mulai gunakan aplikasi!

## 📦 Deploy ke Production

### Vercel (Recommended)

1. Push ke GitHub
2. Import ke Vercel
3. Set environment variables
4. Deploy!

Detail lengkap: Lihat `DEPLOYMENT.md`

## ❓ Troubleshooting

**Cannot connect to database?**
- Cek environment variables
- Pastikan SQL schema sudah dijalankan
- Verifikasi API keys benar

**Upload file gagal?**
- Pastikan storage buckets sudah dibuat
- Set buckets menjadi public

**Build error?**
```bash
npm install
npm run build
```

## 📚 Dokumentasi Lengkap

- `README.md` - Dokumentasi lengkap
- `DEPLOYMENT.md` - Panduan deployment detail
- `supabase-schema.sql` - Database schema

## 🎯 Fitur Utama

✅ Authentication (Login/Register)
✅ Dashboard dengan statistics
✅ Surat Masuk/Keluar + file upload
✅ Transaksi Keuangan + laporan
✅ Arsip Dokumen
✅ Data Kepegawaian + foto

---

Selamat menggunakan KarAdmin! 🎉
