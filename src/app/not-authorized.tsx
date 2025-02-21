import Image from "next/image";
import Link from "next/link";

const NotAuthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-2xl bg-white text-center">
        <Image
          src="/not-authorized.png"
          alt="Page Not Found"
          width={500}
          height={350}
          className="rounded-md mx-auto"
        />
        <p className="text-3xl text-gray-700 mb-8 text-center">
          Hey! You are not authorized to view this page.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
