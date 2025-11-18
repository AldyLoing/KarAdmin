'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileOutput, DollarSign, Archive, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface DashboardStats {
  totalEmployees: number;
  totalIncomingLetters: number;
  totalOutgoingLetters: number;
  totalArchives: number;
  totalPemasukan: number;
  totalPengeluaran: number;
  saldoAkhir: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  date: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalIncomingLetters: 0,
    totalOutgoingLetters: 0,
    totalArchives: 0,
    totalPemasukan: 0,
    totalPengeluaran: 0,
    saldoAkhir: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch counts
      const [
        { count: employeesCount },
        { count: incomingCount },
        { count: outgoingCount },
        { count: archivesCount },
        { data: transactions }
      ] = await Promise.all([
        supabase.from('employees').select('*', { count: 'exact', head: true }),
        supabase.from('incoming_letters').select('*', { count: 'exact', head: true }),
        supabase.from('outgoing_letters').select('*', { count: 'exact', head: true }),
        supabase.from('archives').select('*', { count: 'exact', head: true }),
        supabase.from('transactions').select('*')
      ]);

      // Calculate financial stats
      let totalPemasukan = 0;
      let totalPengeluaran = 0;
      transactions?.forEach((t: any) => {
        if (t.kategori === 'pemasukan') {
          totalPemasukan += parseFloat(t.jumlah);
        } else {
          totalPengeluaran += parseFloat(t.jumlah);
        }
      });

      setStats({
        totalEmployees: employeesCount || 0,
        totalIncomingLetters: incomingCount || 0,
        totalOutgoingLetters: outgoingCount || 0,
        totalArchives: archivesCount || 0,
        totalPemasukan,
        totalPengeluaran,
        saldoAkhir: totalPemasukan - totalPengeluaran,
      });

      // Fetch recent activities
      const { data: recentLetters } = await supabase
        .from('incoming_letters')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const activities: RecentActivity[] = recentLetters?.map((letter: any) => ({
        id: letter.id,
        type: 'Surat Masuk',
        description: letter.perihal,
        date: letter.created_at,
      })) || [];

      setRecentActivities(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan sistem administrasi perkantoran</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pegawai</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Data kepegawaian terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Surat Masuk</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalIncomingLetters}</div>
            <p className="text-xs text-muted-foreground">Total surat masuk</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Surat Keluar</CardTitle>
            <FileOutput className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOutgoingLetters}</div>
            <p className="text-xs text-muted-foreground">Total surat keluar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arsip Dokumen</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArchives}</div>
            <p className="text-xs text-muted-foreground">Total dokumen arsip</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalPemasukan)}
            </div>
            <p className="text-xs text-muted-foreground">Akumulasi pemasukan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.totalPengeluaran)}
            </div>
            <p className="text-xs text-muted-foreground">Akumulasi pengeluaran</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Akhir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.saldoAkhir >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(stats.saldoAkhir)}
            </div>
            <p className="text-xs text-muted-foreground">Pemasukan - Pengeluaran</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>5 aktivitas terakhir dalam sistem</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 border-b pb-3 last:border-0">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(activity.date)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Belum ada aktivitas terbaru
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
