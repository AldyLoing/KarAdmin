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
import { Plus, Pencil, Trash2, Search, FileText, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface IncomingLetter {
  id: string;
  nomor_surat: string;
  pengirim: string;
  tanggal: string;
  perihal: string;
  file_url: string | null;
  created_at: string;
}

export default function SuratMasukPage() {
  const [letters, setLetters] = useState<IncomingLetter[]>([]);
  const [filteredLetters, setFilteredLetters] = useState<IncomingLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<IncomingLetter | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nomor_surat: '',
    pengirim: '',
    tanggal: '',
    perihal: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLetters();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = letters.filter(
        (letter) =>
          letter.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
          letter.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          letter.pengirim.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLetters(filtered);
    } else {
      setFilteredLetters(letters);
    }
  }, [searchTerm, letters]);

  const fetchLetters = async () => {
    try {
      const { data, error } = await supabase
        .from('incoming_letters')
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) throw error;
      setLetters(data || []);
      setFilteredLetters(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data surat masuk.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let fileUrl = editingLetter?.file_url || null;

      // Upload file if exists
      if (file) {
        const { data, error } = await uploadFile('documents', 'surat-masuk', file);
        if (error) throw error;
        fileUrl = data?.path || null;
      }

      if (editingLetter) {
        // Update
        const { error } = await supabase
          .from('incoming_letters')
          .update({ ...formData, file_url: fileUrl })
          .eq('id', editingLetter.id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Surat masuk berhasil diperbarui.',
        });
      } else {
        // Insert
        const { error } = await supabase
          .from('incoming_letters')
          .insert([{ ...formData, file_url: fileUrl }]);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Surat masuk berhasil ditambahkan.',
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchLetters();
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

  const handleEdit = (letter: IncomingLetter) => {
    setEditingLetter(letter);
    setFormData({
      nomor_surat: letter.nomor_surat,
      pengirim: letter.pengirim,
      tanggal: letter.tanggal,
      perihal: letter.perihal,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (letter: IncomingLetter) => {
    try {
      if (letter.file_url) {
        await deleteFile('documents', letter.file_url);
      }

      const { error } = await supabase
        .from('incoming_letters')
        .delete()
        .eq('id', letter.id);

      if (error) throw error;

      toast({
        title: 'Berhasil',
        description: 'Surat masuk berhasil dihapus.',
      });
      fetchLetters();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Gagal menghapus surat masuk.',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nomor_surat: '',
      pengirim: '',
      tanggal: '',
      perihal: '',
    });
    setFile(null);
    setEditingLetter(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Surat Masuk</h1>
          <p className="text-muted-foreground">Kelola surat masuk dan dokumen terkait</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Surat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingLetter ? 'Edit' : 'Tambah'} Surat Masuk</DialogTitle>
              <DialogDescription>
                Lengkapi form di bawah untuk {editingLetter ? 'mengubah' : 'menambah'} surat masuk.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nomor_surat">Nomor Surat *</Label>
                  <Input
                    id="nomor_surat"
                    value={formData.nomor_surat}
                    onChange={(e) => setFormData({ ...formData, nomor_surat: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pengirim">Pengirim *</Label>
                  <Input
                    id="pengirim"
                    value={formData.pengirim}
                    onChange={(e) => setFormData({ ...formData, pengirim: e.target.value })}
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
                  <Label htmlFor="perihal">Perihal *</Label>
                  <Textarea
                    id="perihal"
                    value={formData.perihal}
                    onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
                    required
                    disabled={submitting}
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">File Lampiran (PDF)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={submitting}
                  />
                  {editingLetter?.file_url && (
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
              <CardTitle>Daftar Surat Masuk</CardTitle>
              <CardDescription>Total: {filteredLetters.length} surat</CardDescription>
            </div>
            <div className="w-full max-w-sm">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nomor surat atau perihal..."
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
                <TableHead>Nomor Surat</TableHead>
                <TableHead>Pengirim</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Perihal</TableHead>
                <TableHead>File</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLetters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Belum ada data surat masuk
                  </TableCell>
                </TableRow>
              ) : (
                filteredLetters.map((letter) => (
                  <TableRow key={letter.id}>
                    <TableCell className="font-medium">{letter.nomor_surat}</TableCell>
                    <TableCell>{letter.pengirim}</TableCell>
                    <TableCell>{formatDate(letter.tanggal)}</TableCell>
                    <TableCell className="max-w-xs truncate">{letter.perihal}</TableCell>
                    <TableCell>
                      {letter.file_url ? (
                        <a
                          href={letter.file_url}
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
                          onClick={() => handleEdit(letter)}
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
                              <AlertDialogTitle>Hapus Surat Masuk?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Data yang dihapus tidak dapat dikembalikan. Yakin ingin menghapus surat ini?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(letter)}>
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
