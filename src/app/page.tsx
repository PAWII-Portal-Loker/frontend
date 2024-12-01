'use client';
import Image from 'next/image';
import { DeviceUUID } from 'device-uuid';
import { useEffect } from 'react';
import LoginDialog from '../components/common/loginDialog';
import useMainStore from '@/state/mainStore';
import RegisterDialog from '../components/common/registerDialog';
import useStore from '@/state/auth/store';

export default function Home() {
  const { uuid, setUuid, setIsLoginDialogOpen } = useMainStore();
  const { isAuthenticated, checkLogin } = useStore();
  console.log('Generated UUID:', uuid);

  useEffect(() => {
    checkLogin();
    if (!isAuthenticated) {
      setIsLoginDialogOpen(true);
    }
  }, [checkLogin, isAuthenticated, setIsLoginDialogOpen]);

  useEffect(() => {
    const generateUuid = async () => {
      const uuid = new DeviceUUID().get();
      setUuid(uuid);
    };

    generateUuid();
  }, [setUuid]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f2f2f2] to-[#e8e8e8] dark:from-black dark:to-[#1a1a1a]">
      <LoginDialog />
      <RegisterDialog />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <p className="text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-6xl">
          Temukan Pekerjaan Impianmu
        </p>
        <p className="text-lg text-center text-gray-700 dark:text-gray-400">
          Jelajahi ribuan lowongan pekerjaan dan temukan karir yang tepat
          untukmu.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
            Cari Lowongan
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded">
            Upload CV
          </button>
        </div>
        <div className="flex gap-6">
          <Image
            className="dark:invert"
            src="/company-logo1.png" // Ganti dengan logo perusahaan 1
            alt="Company 1 Logo"
            width={100}
            height={50}
          />
          <Image
            className="dark:invert"
            src="/company-logo2.png" // Ganti dengan logo perusahaan 2
            alt="Company 2 Logo"
            width={100}
            height={50}
          />
          <Image
            className="dark:invert"
            src="/company-logo3.png" // Ganti dengan logo perusahaan 3
            alt="Company 3 Logo"
            width={100}
            height={50}
          />
        </div>
      </div>
    </main>
  );
}
