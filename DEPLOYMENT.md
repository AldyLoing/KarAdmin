# Panduan Deploy ke Vercel

## Persiapan

1. Pastikan project sudah di-push ke GitHub
2. Pastikan Supabase project sudah siap (database schema dan storage buckets sudah dibuat)
3. Catat URL dan Anon Key Supabase Anda

## Langkah-Langkah Deploy

### Metode 1: Via Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Buka [https://vercel.com](https://vercel.com)
   - Login dengan GitHub account

2. **Import Project**
   - Klik "Add New..." → "Project"
   - Pilih repository KarAdmin dari list
   - Klik "Import"

3. **Configure Project**
   - **Project Name**: karadmin (atau nama lain yang Anda inginkan)
   - **Framework Preset**: Next.js (sudah auto-detect)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables**
   
   Tambahkan 2 environment variables berikut:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...xxxxx
   ```
   
   - Klik "Add" untuk setiap variable
   - Pilih environment: "Production", "Preview", dan "Development" (centang semua)

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build (biasanya 2-5 menit)
   - Setelah selesai, akan muncul confetti animation 🎉
   - Klik "Continue to Dashboard"

6. **Akses Aplikasi**
   - URL production: `https://karadmin.vercel.app` (atau custom domain)
   - Klik "Visit" untuk membuka aplikasi

### Metode 2: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy dari Terminal**
   ```bash
   cd KarAdmin
   vercel
   ```

4. **Jawab Pertanyaan Setup**
   ```
   ? Set up and deploy "~/KarAdmin"? [Y/n] y
   ? Which scope do you want to deploy to? Your Name
   ? Link to existing project? [y/N] n
   ? What's your project's name? karadmin
   ? In which directory is your code located? ./
   ```

5. **Set Environment Variables**
   
   Setelah deploy pertama kali, set env variables:
   
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   ```
   
   Masukkan value, pilih environment (Production, Preview, Development)
   
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
   
   Masukkan value, pilih environment

6. **Deploy Ulang dengan Environment Variables**
   ```bash
   vercel --prod
   ```

## Post-Deploy Checklist

### 1. Test Aplikasi

- [ ] Akses URL production
- [ ] Test register account baru
- [ ] Test login
- [ ] Test setiap modul (surat masuk, keluar, keuangan, arsip, pegawai)
- [ ] Test upload file
- [ ] Test CRUD operations

### 2. Configure Custom Domain (Opsional)

1. Di Vercel Dashboard, buka project
2. Klik tab "Settings" → "Domains"
3. Tambahkan custom domain Anda
4. Ikuti instruksi DNS configuration
5. Tunggu propagation (5-48 jam)

### 3. Setup Supabase untuk Production

1. **Update Redirect URLs di Supabase**
   - Buka Supabase Dashboard
   - **Authentication** → **URL Configuration**
   - Tambahkan production URL Anda ke "Site URL"
   - Tambahkan ke "Redirect URLs":
     ```
     https://your-domain.vercel.app/**
     ```

2. **Enable RLS Policies**
   - Pastikan semua RLS policies sudah aktif
   - Test dengan user yang berbeda untuk memastikan data security

3. **Setup Email Provider (Untuk Production)**
   - **Authentication** → **Settings** → **SMTP Settings**
   - Configure custom SMTP (Gmail, SendGrid, dll)
   - Test email confirmation dan password reset

## Continuous Deployment

Setelah setup awal, setiap push ke branch `main` akan otomatis trigger deployment baru:

1. **Commit Changes**
   ```bash
   git add .
   git commit -m "Update feature"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Auto Deploy**
   - Vercel akan otomatis detect push
   - Build dan deploy otomatis
   - Notifikasi via email/Slack (jika disetup)

## Monitoring & Logs

### View Deployment Logs

1. Buka Vercel Dashboard
2. Pilih project → "Deployments"
3. Klik deployment yang ingin dilihat
4. Tab "Building" untuk build logs
5. Tab "Functions" untuk runtime logs

### Analytics

- Vercel Dashboard → "Analytics"
- Lihat visitor stats, page views, dll
- Available di Pro plan

## Rollback Deployment

Jika deployment bermasalah:

1. Buka "Deployments" di dashboard
2. Pilih deployment sebelumnya yang stabil
3. Klik "⋯" (three dots) → "Promote to Production"

## Environment Variables Management

### Menambah Variable Baru

**Via Dashboard:**
1. Project Settings → "Environment Variables"
2. Klik "Add"
3. Masukkan key dan value
4. Pilih environment
5. Klik "Save"

**Via CLI:**
```bash
vercel env add VARIABLE_NAME
```

### Update Variable

**Via Dashboard:**
1. Edit di Settings → Environment Variables
2. Redeploy untuk apply changes

**Via CLI:**
```bash
vercel env rm VARIABLE_NAME
vercel env add VARIABLE_NAME
```

### Pull Environment Variables (untuk local dev)

```bash
vercel env pull .env.local
```

## Performance Optimization

### 1. Enable Edge Functions (Opsional)

Untuk response time lebih cepat:

```typescript
// app/api/route.ts
export const runtime = 'edge';
```

### 2. Image Optimization

Next.js Image component sudah otomatis optimize di Vercel:
- Automatic WebP/AVIF conversion
- Responsive images
- Lazy loading

### 3. Caching

Vercel otomatis cache:
- Static pages
- API responses (dengan proper headers)
- Images

## Troubleshooting Deploy

### Build Failed

1. **Check Build Logs**
   - Lihat error message di deployment logs
   - Biasanya missing dependency atau TypeScript error

2. **Common Fixes**
   ```bash
   # Lokally, pastikan build success
   npm run build
   
   # Fix TypeScript errors
   npm run lint
   ```

### Environment Variables Not Working

1. Pastikan prefix `NEXT_PUBLIC_` untuk client-side variables
2. Redeploy setelah menambah env variables
3. Clear browser cache

### 404 Errors

1. Pastikan routing Next.js correct
2. Check `next.config.js` untuk custom routing
3. Vercel otomatis handle Next.js routing

### Function Timeout

Default timeout: 10s (Hobby), 60s (Pro)

Jika ada long-running operations:
1. Optimize query
2. Use background jobs
3. Upgrade ke Pro plan

## Monitoring Production

### Setup Alerts

1. **Slack Integration**
   - Project Settings → "Integrations"
   - Add Slack
   - Get notified on deploys/errors

2. **Email Notifications**
   - Account Settings → "Notifications"
   - Enable desired notifications

### Error Tracking (Optional)

Integrate Sentry atau LogRocket:

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

## Backup Strategy

### Database Backup (Supabase)

Supabase auto-backup daily, tapi bisa manual export:

1. Supabase Dashboard → "Database"
2. Klik "Backups"
3. Download backup file

### Code Backup

- GitHub repository adalah backup code
- Tag releases untuk production versions
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

## Scaling

### Free Tier Limits

- Bandwidth: 100GB/month
- Invocations: 100GB-hours
- Build time: 6000 minutes/month

### Upgrade Considerations

Upgrade ke Pro jika:
- Traffic > 100GB/month
- Need team collaboration
- Want advanced analytics
- Need password protection

## Security Best Practices

1. **Never commit `.env.local`**
   - Already in `.gitignore`
   - Use Vercel environment variables

2. **Supabase RLS**
   - Always enable Row Level Security
   - Test policies dengan different users

3. **CORS Configuration**
   - Already handled by Next.js
   - Add domains to Supabase if needed

4. **Rate Limiting**
   - Consider adding rate limiting for API routes
   - Use Vercel Edge Middleware

## Success Indicators

Deploy berhasil jika:

- ✅ Build completed without errors
- ✅ All pages accessible
- ✅ Authentication working
- ✅ Database queries successful
- ✅ File uploads working
- ✅ No console errors in browser
- ✅ Responsive di mobile dan desktop

---

**Deployment selesai! Aplikasi Anda sekarang live di production! 🚀**

Untuk support dan troubleshooting lebih lanjut, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
