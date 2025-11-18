'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { uploadFile, deleteFile } from '@/lib/supabase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Search, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Archive {
  id: string;
  judul: string;
  jenis: string;
  tanggal: string;
  keterangan: string;
  file_url: string | null;
  created_at: string;
}

export default function ArsipPage() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [filteredArchives, setFilteredArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArchive, setEditingArchive] = useState<Archive | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    judul: '',
    jenis: '',
    tanggal: '',
    keterangan: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchArchives();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = archives.filter(
        (archive) =>
          archive.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
          archive.jenis.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArchives(filtered);
    } else {
      setFilteredArchives(archives);
    }
  }, [searchTerm, archives]);

  const fetchArchives = async () => {
    try {
      const { data, error } = await supabase
        .from('archives')
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) throw error;
      setArchives(data || []);
      setFilteredArchives(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data arsip.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let fileUrl = editingArchive?.file_url || null;

      if (file) {
        const { data, error } = await uploadFile('documents', 'arsip', file);
        if (error) throw error;
        fileUrl = data?.path || null;
      }

      if (editingArchive) {
        const { error } = await supabase
          .from('archives')
          .update({ ...formData, file_url: fileUrl })
          .eq('id', editingArchive.id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Arsip berhasil diperbarui.',
        });
      } else {
        const { error } = await supabase
          .from('archives')
          .insert([{ ...formData, file_url: fileUrl }]);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Arsip berhasil ditambahkan.',
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchArchives();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Terjadi kesalahan.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (archive: Archive) => {
    setEditingArchive(archive);
    setFormData({
      judul: archive.judul,
      jenis: archive.jenis,
      tanggal: archive.tanggal,
      keterangan: archive.keterangan,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (archive: Archive) => {
    try {
      if (archive.file_url) {
        await deleteFile('documents', archive.file_url);
      }

      const { error } = await supabase
        .from('archives')
        .delete()
        .eq('id', archive.id);

      if (error) throw error;

      toast({
        title: 'Berhasil',
        description: 'Arsip berhasil dihapus.',
      });
      fetchArchives();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Gagal menghapus arsip.',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      judul: '',
      jenis: '',
      tanggal: '',
      keterangan: '',
    });
    setFile(null);
    setEditingArchive(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Arsip Dokumen</h1>
          <p className="text-muted-foreground">Kelola arsip dokumen perkantoran</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Arsip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingArchive ? 'Edit' : 'Tambah'} Arsip</DialogTitle>
              <DialogDescription>
                Lengkapi form di bawah untuk {editingArchive ? 'mengubah' : 'menambah'} arsip.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="judul">Judul *</Label>
                  <Input
                    id="judul"
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jenis">Jenis Dokumen *</Label>
                  <Input
                    id="jenis"
                    value={formData.jenis}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    placeholder="Contoh: Kontrak, MoU, SK, dll"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tanggal">Tanggal *</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="keterangan">Keterangan *</Label>
                  <Textarea
                    id="keterangan"
                    value={formData.keterangan}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                    required
                    disabled={submitting}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">File Dokumen (PDF)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={submitting}
                  />
                  {editingArchive?.file_url && (
                    <p className="text-sm text-muted-foreground">File saat ini tersimpan</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose} disabled={submitting}>
                  Batal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Arsip</CardTitle>
              <CardDescription>Total: {filteredArchives.length} dokumen</CardDescription>
            </div>
            <div className="w-full max-w-sm">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari judul atau jenis dokumen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>File</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArchives.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Belum ada data arsip
                  </TableCell>
                </TableRow>
              ) : (
                filteredArchives.map((archive) => (
                  <TableRow key={archive.id}>
                    <TableCell className="font-medium">{archive.judul}</TableCell>
                    <TableCell>{archive.jenis}</TableCell>
                    <TableCell>{formatDate(archive.tanggal)}</TableCell>
                    <TableCell className="max-w-xs truncate">{archive.keterangan}</TableCell>
                    <TableCell>
                      {archive.file_url ? (
                        <a
                          href={archive.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Lihat
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(archive)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Arsip?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Data yang dihapus tidak dapat dikembalikan. Yakin ingin menghapus arsip ini?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(archive)}>
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
