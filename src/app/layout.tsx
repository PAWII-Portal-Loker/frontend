"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import LoginDialog from "@/components/layouts/loginDialog";
import RegisterDialog from "@/components/layouts/registerDialog";
import useAuthStore from "@/contexts/auth/store";
import { useEffect } from "react";
import RoleDialog from "@/components/layouts/roleDialog";
import Head from "next/head";
import { useIsNotHomePage } from "@/common/utils/checkPathName";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { checkLogin } = useAuthStore();
  const isNotHomePage = useIsNotHomePage();

  useEffect(() => {
    checkLogin();

    const intervalId = setInterval(() => {
      checkLogin();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [checkLogin]);

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <body
        className={`${inter.className} bg-gradient-to-r from-slate-200 to-slate-400 text-gray-800`}
      >
        <Provider>
          {isNotHomePage && <Navbar />}
          <Toaster />
          <main className={clsx(isNotHomePage && "pt-16")}>
            <LoginDialog />
            <RegisterDialog />
            <RoleDialog />
            {children}
          </main>
          {isNotHomePage && <Footer />}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
