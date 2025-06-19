import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // We'll create this file next

const handler = NextAuth({
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
      // Custom validation for Queen's University email
      async validateEmail(email: string) {
        const queensEmail = email.toLowerCase().endsWith('@queensu.ca');
        if (!queensEmail) {
          throw new Error('Only Queen\'s University email addresses are allowed');
        }
        return true;
      }
    })
  ],
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
});

export { handler as GET, handler as POST }; 