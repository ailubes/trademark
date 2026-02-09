'use client';

import { useEffect } from 'react';
import { ErrorMascot } from '@/components/layout/ErrorMascot';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <ErrorMascot />
      <h1 className="text-3xl font-bold text-slate-900 mt-6">Something went wrong!</h1>
      <p className="text-slate-600 mt-2">An unexpected error occurred.</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
