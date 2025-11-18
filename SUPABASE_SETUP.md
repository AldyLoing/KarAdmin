# Instruksi Setup Supabase

## 1. Buat Project Supabase

1. Kunjungi https://supabase.com
2. Sign up atau login
3. Klik "New Project"
4. Isi detail:
   - **Name**: KarAdmin (atau nama lain)
   - **Database Password**: Buat password yang kuat
   - **Region**: Pilih yang terdekat dengan lokasi Anda
5. Klik "Create new project"
6. Tunggu ~2 menit hingga project siap

## 2. Jalankan Database Schema

1. Di Supabase Dashboard, klik **SQL Editor** di sidebar kiri
2. Klik tombol **New query**
3. Copy **SELURUH** isi file `supabase-schema.sql` dari project ini
4. Paste ke SQL Editor
5. Klik tombol **Run** (atau tekan Ctrl+Enter)
6. Pastikan muncul pesan sukses "Success. No rows returned"

Jika ada error, pastikan:
- Anda copy seluruh isi file tanpa ada yang terpotong
- Tidak ada karakter aneh yang ter-copy

## 3. Setup Storage Buckets

### A. Buat Bucket untuk Documents

1. Klik **Storage** di sidebar kiri
2. Klik tombol **New bucket**
3. Isi form:
   - **Name**: `documents`
   - **Public bucket**: ✅ **Centang/On**
   - **File size limit**: 52428800 (50MB)
   - **Allowed MIME types**: Biarkan kosong (allow all)
4. Klik **Create bucket**

### B. Buat Bucket untuk Photos

1. Klik tombol **New bucket** lagi
2. Isi form:
   - **Name**: `photos`
   - **Public bucket**: ✅ **Centang/On**
   - **File size limit**: 5242880 (5MB)
   - **Allowed MIME types**: Biarkan kosong (allow all)
3. Klik **Create bucket**

## 4. Dapatkan API Credentials

1. Klik ⚙️ **Settings** di sidebar kiri bawah
2. Klik **API** di submenu
3. Scroll ke section "Project API keys"
4. **COPY** nilai berikut:

   ### Project URL
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   ### Project API Key (anon, public)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M.....
   ```

5. **SIMPAN** kedua nilai ini, akan digunakan di `.env.local`

## 5. Optional: Disable Email Confirmation (Development)

Untuk mempermudah testing saat development:

1. Klik **Authentication** di sidebar
2. Klik **Providers** di submenu
3. Klik **Email** provider
4. Scroll ke bawah ke bagian "Email Confirmation"
5. **Toggle OFF** "Enable email confirmations"
6. Klik **Save**

⚠️ **PENTING**: Untuk production, aktifkan kembali dan setup email provider (SMTP)!

## 6. Verifikasi Setup

Cek apakah semua sudah benar:

- [ ] Database tables sudah dibuat (5 tables: employees, transactions, incoming_letters, outgoing_letters, archives)
- [ ] RLS policies sudah aktif di semua tables
- [ ] Storage bucket `documents` sudah dibuat (public)
- [ ] Storage bucket `photos` sudah dibuat (public)
- [ ] API credentials sudah di-copy

## 7. Lanjut ke Step Berikutnya

Setelah semua setup di atas selesai:

1. Copy API credentials ke file `.env.local` di project
2. Jalankan `npm run dev`
3. Buka http://localhost:3000
4. Register account baru
5. Test semua fitur!

## Troubleshooting

### "relation does not exist"
- SQL schema belum dijalankan
- Jalankan ulang file `supabase-schema.sql`

### "new row violates row-level security policy"
- RLS policies belum dibuat
- Pastikan bagian CREATE POLICY di SQL sudah dijalankan

### File upload gagal
- Bucket belum dibuat atau tidak public
- Cek di Storage apakah bucket `documents` dan `photos` ada
- Pastikan kedua bucket di-set sebagai Public

### Cannot connect to Supabase
- Cek environment variables di `.env.local`
- Pastikan URL dan API key benar
- Restart development server (`npm run dev`)

---

Jika ada error lain yang tidak tercantum di sini, cek:
- Supabase Dashboard → Logs (untuk database errors)
- Browser Console (untuk client errors)
- Terminal (untuk server errors)
