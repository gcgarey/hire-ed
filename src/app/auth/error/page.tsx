"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    'Configuration': 'Server configuration error. Please contact support.',
    'AccessDenied': 'Access denied. Only Queen\'s University email addresses are allowed.',
    'Verification': 'The sign-in link is no longer valid. Please request a new one.',
    'Default': 'An unexpected error occurred during authentication.'
  };

  const displayError = error && errorMessages[error] 
    ? errorMessages[error] 
    : errorMessages['Default'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-red-600">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {displayError}
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link 
            href="/auth/signin" 
            className="w-full text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </Link>
          <Link 
            href="/" 
            className="w-full text-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 