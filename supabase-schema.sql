-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    nip VARCHAR(50) UNIQUE NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    unit_kerja VARCHAR(255) NOT NULL,
    kontak VARCHAR(100) NOT NULL,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tanggal DATE NOT NULL,
    kategori VARCHAR(20) CHECK (kategori IN ('pemasukan', 'pengeluaran')) NOT NULL,
    jumlah DECIMAL(15, 2) NOT NULL,
    deskripsi TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create incoming_letters table
CREATE TABLE IF NOT EXISTS incoming_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nomor_surat VARCHAR(100) UNIQUE NOT NULL,
    pengirim VARCHAR(255) NOT NULL,
    tanggal DATE NOT NULL,
    perihal TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create outgoing_letters table
CREATE TABLE IF NOT EXISTS outgoing_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nomor_surat VARCHAR(100) UNIQUE NOT NULL,
    tujuan VARCHAR(255) NOT NULL,
    tanggal DATE NOT NULL,
    perihal TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create archives table
CREATE TABLE IF NOT EXISTS archives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul VARCHAR(255) NOT NULL,
    jenis VARCHAR(100) NOT NULL,
    tanggal DATE NOT NULL,
    keterangan TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_employees_nip ON employees(nip);
CREATE INDEX IF NOT EXISTS idx_employees_name ON employees(name);
CREATE INDEX IF NOT EXISTS idx_transactions_tanggal ON transactions(tanggal);
CREATE INDEX IF NOT EXISTS idx_transactions_kategori ON transactions(kategori);
CREATE INDEX IF NOT EXISTS idx_incoming_letters_nomor ON incoming_letters(nomor_surat);
CREATE INDEX IF NOT EXISTS idx_incoming_letters_tanggal ON incoming_letters(tanggal);
CREATE INDEX IF NOT EXISTS idx_outgoing_letters_nomor ON outgoing_letters(nomor_surat);
CREATE INDEX IF NOT EXISTS idx_outgoing_letters_tanggal ON outgoing_letters(tanggal);
CREATE INDEX IF NOT EXISTS idx_archives_jenis ON archives(jenis);
CREATE INDEX IF NOT EXISTS idx_archives_tanggal ON archives(tanggal);

-- Enable Row Level Security (RLS)
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE incoming_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE outgoing_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (full access)
-- Employees policies
CREATE POLICY "Enable read access for authenticated users" ON employees
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable insert access for authenticated users" ON employees
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    
CREATE POLICY "Enable update access for authenticated users" ON employees
    FOR UPDATE USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable delete access for authenticated users" ON employees
    FOR DELETE USING (auth.role() = 'authenticated');

-- Transactions policies
CREATE POLICY "Enable read access for authenticated users" ON transactions
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable insert access for authenticated users" ON transactions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    
CREATE POLICY "Enable update access for authenticated users" ON transactions
    FOR UPDATE USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable delete access for authenticated users" ON transactions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Incoming letters policies
CREATE POLICY "Enable read access for authenticated users" ON incoming_letters
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable insert access for authenticated users" ON incoming_letters
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    
CREATE POLICY "Enable update access for authenticated users" ON incoming_letters
    FOR UPDATE USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable delete access for authenticated users" ON incoming_letters
    FOR DELETE USING (auth.role() = 'authenticated');

-- Outgoing letters policies
CREATE POLICY "Enable read access for authenticated users" ON outgoing_letters
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable insert access for authenticated users" ON outgoing_letters
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    
CREATE POLICY "Enable update access for authenticated users" ON outgoing_letters
    FOR UPDATE USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable delete access for authenticated users" ON outgoing_letters
    FOR DELETE USING (auth.role() = 'authenticated');

-- Archives policies
CREATE POLICY "Enable read access for authenticated users" ON archives
    FOR SELECT USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable insert access for authenticated users" ON archives
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    
CREATE POLICY "Enable update access for authenticated users" ON archives
    FOR UPDATE USING (auth.role() = 'authenticated');
    
CREATE POLICY "Enable delete access for authenticated users" ON archives
    FOR DELETE USING (auth.role() = 'authenticated');
