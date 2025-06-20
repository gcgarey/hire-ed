import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // We'll create this file next

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
    })
  ],
  // Dynamically set base URL
  ...(process.env.NEXTAUTH_URL ? { 
    url: process.env.NEXTAUTH_URL 
  } : {
    url: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
  }),
  callbacks: {
    // Restrict sign-in to only Queen's University emails
    async signIn({ user, account }) {
      if (account?.provider === 'email') {
        return user.email?.toLowerCase().endsWith('@queensu.ca') || false;
      }
      return false;
    },
    // Add custom claims to the session
    async session({ session }) {
      if (session.user?.email) {
        session.user.isQueensStudent = session.user.email.toLowerCase().endsWith('@queensu.ca');
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 