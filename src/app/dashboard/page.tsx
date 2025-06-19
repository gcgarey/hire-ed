"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    }
  });

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        
        {session?.user && (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-xl font-semibold">Profile Details</h2>
              <p><strong>Email:</strong> {session.user.email}</p>
              {session.user.isQueensStudent && (
                <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">
                  Verified Queen's University Student
                </div>
              )}
            </div>

            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 