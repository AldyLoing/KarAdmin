# Changelog

All notable changes to KarAdmin will be documented in this file.

## [1.0.0] - 2024-11-18

### Added
- Initial release of KarAdmin
- User authentication (Login/Register) with Supabase Auth
- Dashboard with statistics and recent activities
- Incoming Letters (Surat Masuk) module with file upload
- Outgoing Letters (Surat Keluar) module with file upload
- Financial Transactions (Keuangan) module with income/expense tracking
- Archives (Arsip) module for document management
- Employee (Kepegawaian) module with photo upload
- Search functionality in all modules
- File upload to Supabase Storage (PDF for documents, images for employee photos)
- Responsive design with Tailwind CSS
- Toast notifications for user feedback
- Protected routes with Next.js middleware
- Complete CRUD operations for all modules
- Data filtering (monthly filter for transactions)
- Complete documentation (README, DEPLOYMENT, QUICKSTART)
- SQL schema for Supabase database setup

### Features
- **Authentication**
  - Email/password authentication
  - Session management
  - Protected routes
  - Logout functionality

- **Dashboard**
  - Statistics cards (total employees, letters, archives, transactions)
  - Financial summary (income, expenses, balance)
  - Recent activities list

- **Surat Masuk**
  - Add/Edit/Delete incoming letters
  - Upload PDF attachments
  - Search by letter number or subject
  - View letter details

- **Surat Keluar**
  - Add/Edit/Delete outgoing letters
  - Upload PDF attachments
  - Search by letter number or subject
  - View letter details

- **Keuangan**
  - Add/Edit/Delete transactions
  - Income and expense categorization
  - Monthly filtering
  - Financial summary (total income, expenses, balance)
  - Transaction history

- **Arsip**
  - Add/Edit/Delete archive documents
  - Document categorization
  - Upload PDF files
  - Search by title or document type

- **Kepegawaian**
  - Add/Edit/Delete employee data
  - Upload employee photos
  - Search by name or NIP
  - View detailed employee information
  - Employee profile with photo

### Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Supabase (PostgreSQL + Auth + Storage)
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Database Schema
- employees table
- transactions table
- incoming_letters table
- outgoing_letters table
- archives table
- Row Level Security (RLS) policies
- Indexes for optimized queries

### Storage
- documents bucket (for letters and archives)
- photos bucket (for employee photos)

### Security
- Row Level Security enabled on all tables
- Authentication required for all routes
- File upload validation
- Environment variables for sensitive data
