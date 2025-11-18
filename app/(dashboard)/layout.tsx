'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  LayoutDashboard, 
  FileText, 
  FileOutput, 
  DollarSign, 
  Archive, 
  Users, 
  LogOut,
  Menu
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/surat-masuk', icon: FileText, label: 'Surat Masuk' },
  { href: '/surat-keluar', icon: FileOutput, label: 'Surat Keluar' },
  { href: '/keuangan', icon: DollarSign, label: 'Keuangan' },
  { href: '/arsip', icon: Archive, label: 'Arsip' },
  { href: '/pegawai', icon: Users, label: 'Pegawai' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logout Berhasil',
        description: 'Anda telah keluar dari sistem.',
      });
      router.push('/login');
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Gagal',
        description: 'Terjadi kesalahan saat logout.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/dashboard" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  KarAdmin
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                      isActive ? 'bg-gray-100 text-primary' : 'text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 lg:ml-64 mt-14">
        <div className="rounded-lg">
          {children}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
