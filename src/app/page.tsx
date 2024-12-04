"use client";
import { DeviceUUID } from "device-uuid";
import { useEffect } from "react";
import useMainStore from "@/state/mainStore";
import useStore from "@/state/auth/store";

export default function Home() {
  const { setUuid } = useMainStore();
  const { checkLogin } = useStore();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    const generateUuid = async () => {
      const uuid = new DeviceUUID().get();
      setUuid(uuid);
    };

    generateUuid();
  }, [setUuid]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-bold tracking-tight text-center text-blue-500 sm:text-6xl">
          Find Your Dream Job
        </h1>
        <p className="text-lg text-center text-gray-600">
          Explore thousands of job vacancies and find the right career for you.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
            Find Jobs
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-3 px-6 rounded">
            Upload Resume
          </button>
        </div>
      </div>
    </main>
  );
}
