"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import LoginDialog from "@/components/layouts/loginDialog";
import RegisterDialog from "@/components/layouts/registerDialog";
import useAuthStore from "@/contexts/(auth)/reducer";
import { useEffect } from "react";
import RoleDialog from "@/components/layouts/roleDialog";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { checkLogin } = useAuthStore();

  useEffect(() => {
    checkLogin();

    const intervalId = setInterval(() => {
      checkLogin();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [checkLogin]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-700 text-gray-100`}>
        <Provider>
          <Navbar />
          <Toaster />
          <main className="mt-16">
            <LoginDialog />
            <RegisterDialog />
            <RoleDialog />
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
