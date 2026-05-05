# Smart Product Price Tracker

Track product prices across e-commerce sites and get alerts on price drops. Built with Next.js, Firecrawl, and Supabase.

## 🎯 Features

- 🔍 **Track Any Product** - Works with Amazon, Zara, Walmart, and more
- 📊 **Price History Charts** - Interactive graphs showing price trends over time
- 🔐 **Google Authentication** - Secure sign-in with Google OAuth
- 🔄 **Automated Daily Checks** - Scheduled cron jobs check prices automatically
- 📧 **Email Alerts** - Get notified when prices drop via Resend

## 🛠️ Tech Stack

- **Next.js** - React framework with App Router
- **Firecrawl** - Web data extraction API
- **Supabase** - Backend platform (PostgreSQL, Auth, RLS)
- **Resend** - Transactional emails
- **shadcn/ui** - UI component library
- **Recharts** - Interactive charts
- **Tailwind CSS** - Styling

## 🚀 Setup Instructions

### 1. Installation

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database migrations located in `supabase/migrations/` in your Supabase SQL Editor.

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

FIRECRAWL_API_KEY=your_firecrawl_api_key

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev

CRON_SECRET=your_generated_cron_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

Deploy to Vercel and ensure all environment variables are added to the project settings.
