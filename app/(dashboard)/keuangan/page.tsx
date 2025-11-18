'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Transaction {
  id: string;
  tanggal: string;
  kategori: 'pemasukan' | 'pengeluaran';
  jumlah: number;
  deskripsi: string;
  created_at: string;
}

export default function KeuanganPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    tanggal: '',
    kategori: 'pemasukan' as 'pemasukan' | 'pengeluaran',
    jumlah: '',
    deskripsi: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const [summary, setSummary] = useState({
    totalPemasukan: 0,
    totalPengeluaran: 0,
    saldo: 0,
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (filterMonth) {
      const filtered = transactions.filter((t) => {
        const transactionMonth = t.tanggal.substring(0, 7);
        return transactionMonth === filterMonth;
      });
      setFilteredTransactions(filtered);
      calculateSummary(filtered);
    } else {
      setFilteredTransactions(transactions);
      calculateSummary(transactions);
    }
  }, [filterMonth, transactions]);

  const calculateSummary = (data: Transaction[]) => {
    let pemasukan = 0;
    let pengeluaran = 0;

    data.forEach((t) => {
      if (t.kategori === 'pemasukan') {
        pemasukan += parseFloat(t.jumlah.toString());
      } else {
        pengeluaran += parseFloat(t.jumlah.toString());
      }
    });

    setSummary({
      totalPemasukan: pemasukan,
      totalPengeluaran: pengeluaran,
      saldo: pemasukan - pengeluaran,
    });
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
      setFilteredTransactions(data || []);
      calculateSummary(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data transaksi.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        jumlah: parseFloat(formData.jumlah),
      };

      if (editingTransaction) {
        const { error } = await supabase
          .from('transactions')
          .update(dataToSubmit)
          .eq('id', editingTransaction.id);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Transaksi berhasil diperbarui.',
        });
      } else {
        const { error } = await supabase
          .from('transactions')
          .insert([dataToSubmit]);

        if (error) throw error;

        toast({
          title: 'Berhasil',
          description: 'Transaksi berhasil ditambahkan.',
        });
      }

      resetForm();
      setDialogOpen(false);
      fetchTransactions();
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

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      tanggal: transaction.tanggal,
      kategori: transaction.kategori,
      jumlah: transaction.jumlah.toString(),
      deskripsi: transaction.deskripsi,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (transaction: Transaction) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transaction.id);

      if (error) throw error;

      toast({
        title: 'Berhasil',
        description: 'Transaksi berhasil dihapus.',
      });
      fetchTransactions();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Gagal menghapus transaksi.',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      tanggal: '',
      kategori: 'pemasukan',
      jumlah: '',
      deskripsi: '',
    });
    setEditingTransaction(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Keuangan</h1>
          <p className="text-muted-foreground">Kelola transaksi keuangan dan laporan</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Transaksi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTransaction ? 'Edit' : 'Tambah'} Transaksi</DialogTitle>
              <DialogDescription>
                Lengkapi form di bawah untuk {editingTransaction ? 'mengubah' : 'menambah'} transaksi.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
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
                  <Label htmlFor="kategori">Kategori *</Label>
                  <Select
                    value={formData.kategori}
                    onValueChange={(value: 'pemasukan' | 'pengeluaran') =>
                      setFormData({ ...formData, kategori: value })
                    }
                    disabled={submitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pemasukan">Pemasukan</SelectItem>
                      <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jumlah">Jumlah (Rp) *</Label>
                  <Input
                    id="jumlah"
                    type="number"
                    step="0.01"
                    value={formData.jumlah}
                    onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deskripsi">Deskripsi *</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    required
                    disabled={submitting}
                    rows={3}
                  />
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.totalPemasukan)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filterMonth ? `Bulan ${filterMonth}` : 'Semua waktu'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalPengeluaran)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filterMonth ? `Bulan ${filterMonth}` : 'Semua waktu'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(summary.saldo)}
            </div>
            <p className="text-xs text-muted-foreground">
              Pemasukan - Pengeluaran
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Riwayat Transaksi</CardTitle>
              <CardDescription>Total: {filteredTransactions.length} transaksi</CardDescription>
            </div>
            <div className="w-full max-w-sm">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  placeholder="Filter bulan"
                />
                {filterMonth && (
                  <Button variant="ghost" size="sm" onClick={() => setFilterMonth('')}>
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Belum ada data transaksi
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.tanggal)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.kategori === 'pemasukan'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.kategori === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{transaction.deskripsi}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={transaction.kategori === 'pemasukan' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.kategori === 'pemasukan' ? '+' : '-'}
                        {formatCurrency(transaction.jumlah)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(transaction)}
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
                              <AlertDialogTitle>Hapus Transaksi?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Data yang dihapus tidak dapat dikembalikan. Yakin ingin menghapus transaksi ini?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(transaction)}>
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
