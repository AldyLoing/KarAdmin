import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string;
          name: string;
          nip: string;
          jabatan: string;
          unit_kerja: string;
          kontak: string;
          foto_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          nip: string;
          jabatan: string;
          unit_kerja: string;
          kontak: string;
          foto_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          nip?: string;
          jabatan?: string;
          unit_kerja?: string;
          kontak?: string;
          foto_url?: string | null;
          created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          tanggal: string;
          kategori: 'pemasukan' | 'pengeluaran';
          jumlah: number;
          deskripsi: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tanggal: string;
          kategori: 'pemasukan' | 'pengeluaran';
          jumlah: number;
          deskripsi: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tanggal?: string;
          kategori?: 'pemasukan' | 'pengeluaran';
          jumlah?: number;
          deskripsi?: string;
          created_at?: string;
        };
      };
      incoming_letters: {
        Row: {
          id: string;
          nomor_surat: string;
          pengirim: string;
          tanggal: string;
          perihal: string;
          file_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nomor_surat: string;
          pengirim: string;
          tanggal: string;
          perihal: string;
          file_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nomor_surat?: string;
          pengirim?: string;
          tanggal?: string;
          perihal?: string;
          file_url?: string | null;
          created_at?: string;
        };
      };
      outgoing_letters: {
        Row: {
          id: string;
          nomor_surat: string;
          tujuan: string;
          tanggal: string;
          perihal: string;
          file_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nomor_surat: string;
          tujuan: string;
          tanggal: string;
          perihal: string;
          file_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nomor_surat?: string;
          tujuan?: string;
          tanggal?: string;
          perihal?: string;
          file_url?: string | null;
          created_at?: string;
        };
      };
      archives: {
        Row: {
          id: string;
          judul: string;
          jenis: string;
          tanggal: string;
          keterangan: string;
          file_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          judul: string;
          jenis: string;
          tanggal: string;
          keterangan: string;
          file_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          judul?: string;
          jenis?: string;
          tanggal?: string;
          keterangan?: string;
          file_url?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
