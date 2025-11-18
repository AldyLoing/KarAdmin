-- Drop existing policies dan buat ulang dengan permission yang benar
-- Run di SQL Editor Supabase

-- Drop existing policies for employees
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON employees;

-- Create new policies for employees (allow all authenticated users)
CREATE POLICY "Allow all for authenticated users" ON employees
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Drop existing policies for transactions
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON transactions;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON transactions;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON transactions;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON transactions;

-- Create new policies for transactions
CREATE POLICY "Allow all for authenticated users" ON transactions
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Drop existing policies for incoming_letters
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON incoming_letters;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON incoming_letters;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON incoming_letters;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON incoming_letters;

-- Create new policies for incoming_letters
CREATE POLICY "Allow all for authenticated users" ON incoming_letters
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Drop existing policies for outgoing_letters
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON outgoing_letters;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON outgoing_letters;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON outgoing_letters;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON outgoing_letters;

-- Create new policies for outgoing_letters
CREATE POLICY "Allow all for authenticated users" ON outgoing_letters
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Drop existing policies for archives
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON archives;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON archives;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON archives;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON archives;

-- Create new policies for archives
CREATE POLICY "Allow all for authenticated users" ON archives
    FOR ALL USING (auth.uid() IS NOT NULL);
