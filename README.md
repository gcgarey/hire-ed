# Hire-Ed MVP Deployment Guide

## Prerequisites
- Vercel Account
- GitHub Repository
- Resend Account
- Vercel Postgres Database

## Environment Setup

### 1. Database Configuration
1. Create a Vercel Postgres database
2. Copy the connection string from Vercel Dashboard
3. Add to `.env`:
```
DATABASE_URL="your_vercel_postgres_connection_string"
```

### 2. Authentication Configuration
1. Generate a secure secret:
```bash
openssl rand -base64 32
```
2. Update `.env`:
```
NEXTAUTH_SECRET="your_generated_secret"
NEXTAUTH_URL="https://your-deployment-url.vercel.app"
```

### 3. Email Service (Resend)
1. Sign up at [Resend](https://resend.com)
2. Create an API key
3. Update `.env`:
```
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="your_resend_api_key"
EMAIL_FROM="Hire-Ed <noreply@yourdomain.com>"
```

## Deployment Steps

### Local Development
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up database schema:
```bash
npx prisma generate
npx prisma migrate dev
```
4. Run development server:
```bash
npm run dev
```

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set Environment Variables in Vercel Dashboard
   - Import all variables from `.env`
3. Deploy!

## Troubleshooting
- Ensure all environment variables are set
- Check Vercel logs for any deployment issues
- Verify database connection and migrations

## Future Improvements
- Add more robust error handling
- Implement additional authentication factors
- Expand user profile capabilities

## Tech Stack
- Next.js 14
- Tailwind CSS
- Prisma ORM
- NextAuth.js
- Vercel Postgres
- Resend Email
