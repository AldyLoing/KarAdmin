'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { uploadFile, deleteFile } from '@/lib/supabase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Search, User } from 'lucide-react';
import Image from 'next/image';

interface Employee {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  unit_kerja: string;
  kontak: string;
  foto_url: string | null;
  created_at: string;
}

export default function PegawaiPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    nip: '',
    jabatan: '',
    unit_kerja: '',
    kontak: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.nip.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setEmployees(data || []);
      setFilteredEmployees(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data pegawai.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let fotoUrl = editingEmployee?.foto_url || null;

      if (file) {
        const { data, error } = await uploadFile('photos', 'pegawai', file);
        if (error) throw error;
        fotoUrl = data?.path || null;
      }

      if (editingEmployee) {
        const { error } = await supabase
          .from('employees')
          .update({ ...formData, foto_url: fotoUrl })
          .eq('id', editingEmployee.id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Data pegawai berhasil diperbarui.',
        });
      } else {
        const { error } = await supabase
          .from('employees')
          .insert([{ ...formData, foto_url: fotoUrl }]);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Data pegawai berhasil ditambahkan.',
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchEmployees();
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

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      nip: employee.nip,
      jabatan: employee.jabatan,
      unit_kerja: employee.unit_kerja,
      kontak: employee.kontak,
    });
    setDialogOpen(true);
  };

  const handleDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailDialogOpen(true);
  };

  const handleDelete = async (employee: Employee) => {
    try {
      if (employee.foto_url) {
        await deleteFile('photos', employee.foto_url);
      }

      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', employee.id);

      if (error) throw error;

      toast({
        title: 'Berhasil',
        description: 'Data pegawai berhasil dihapus.',
      });
      fetchEmployees();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Gagal menghapus data pegawai.',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nip: '',
      jabatan: '',
      unit_kerja: '',
      kontak: '',
    });
    setFile(null);
    setEditingEmployee(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Data Kepegawaian</h1>
          <p className="text-muted-foreground">Kelola data pegawai dan informasi terkait</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pegawai
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingEmployee ? 'Edit' : 'Tambah'} Pegawai</DialogTitle>
              <DialogDescription>
                Lengkapi form di bawah untuk {editingEmployee ? 'mengubah' : 'menambah'} data pegawai.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nip">NIP *</Label>
                  <Input
                    id="nip"
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jabatan">Jabatan *</Label>
                  <Input
                    id="jabatan"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit_kerja">Unit Kerja *</Label>
                  <Input
                    id="unit_kerja"
                    value={formData.unit_kerja}
                    onChange={(e) => setFormData({ ...formData, unit_kerja: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="kontak">Kontak (Email/Telepon) *</Label>
                  <Input
                    id="kontak"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">Foto Pegawai (JPG/PNG)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={submitting}
                  />
                  {editingEmployee?.foto_url && (
                    <p className="text-sm text-muted-foreground">Foto saat ini tersimpan</p>
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
              <CardTitle>Daftar Pegawai</CardTitle>
              <CardDescription>Total: {filteredEmployees.length} pegawai</CardDescription>
            </div>
            <div className="w-full max-w-sm">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama atau NIP..."
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
                <TableHead>Foto</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIP</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Unit Kerja</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Belum ada data pegawai
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      {employee.foto_url ? (
                        <img 
                          src={employee.foto_url} 
                          alt={employee.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <button
                        onClick={() => handleDetail(employee)}
                        className="text-primary hover:underline text-left"
                      >
                        {employee.name}
                      </button>
                    </TableCell>
                    <TableCell>{employee.nip}</TableCell>
                    <TableCell>{employee.jabatan}</TableCell>
                    <TableCell>{employee.unit_kerja}</TableCell>
                    <TableCell>{employee.kontak}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(employee)}
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
                              <AlertDialogTitle>Hapus Data Pegawai?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Data yang dihapus tidak dapat dikembalikan. Yakin ingin menghapus data pegawai ini?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(employee)}>
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

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Pegawai</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex justify-center">
                {selectedEmployee.foto_url ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={selectedEmployee.foto_url}
                      alt={selectedEmployee.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nama Lengkap</p>
                  <p className="text-base">{selectedEmployee.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">NIP</p>
                  <p className="text-base">{selectedEmployee.nip}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Jabatan</p>
                  <p className="text-base">{selectedEmployee.jabatan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unit Kerja</p>
                  <p className="text-base">{selectedEmployee.unit_kerja}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Kontak</p>
                  <p className="text-base">{selectedEmployee.kontak}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
