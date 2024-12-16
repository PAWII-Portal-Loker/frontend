"use client";

import Image from "next/image";
import { FallbackProps } from "react-error-boundary";

interface ErrorPageProps extends FallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-2xl bg-white text-center">
        <Image
          src="/error.png"
          alt="Page Not Found"
          width={500}
          height={350}
          className="rounded-md mx-auto"
        />
        <h1 className="text-3xl font-bold mb-4">Oops, Something Went Wrong!</h1>
        <p className="text-lg mb-8">
          An unexpected error occurred. Please try again later.
        </p>
        {error.message && (
          <p className="text-red-500 text-sm mb-8">Error: {error.message}</p>
        )}
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
    </div>
  );
};

export default ErrorPage;
