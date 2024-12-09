"use client";

import { FallbackProps } from "react-error-boundary";

interface GlobalErrorProps extends FallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Oops, Something Went Wrong!</h1>
      <p className="text-lg mb-8">
        An unexpected error occurred. Please try again later.
      </p>
      {error.digest && (
        <p className="text-sm mb-8">Error Digest: {error.digest}</p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
