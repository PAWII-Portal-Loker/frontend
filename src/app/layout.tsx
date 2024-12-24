"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Provider } from "@ui/provider";
import { Toaster } from "@ui/toaster";
import Navbar from "@components/layouts/navbar";
import LoginDialog from "@components/layouts/auth/loginDialog";
import RegisterDialog from "@components/layouts/auth/registerDialog";
import Footer from "@components/layouts/footer";
import RoleDialog from "@components/layouts/auth/roleDialog";
import useAuthStore from "src/contexts/auth/store";
import { useIsNotHomePage } from "@utils/checkPathName";

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
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <body
        className={clsx(
          inter.className,
          "flex flex-col min-h-screen bg-gradient-to-r from-slate-200 to-slate-400 text-gray-800"
        )}
      >
        <Provider>
          {isNotHomePage && <Navbar />}
          <Toaster />
          <main className={clsx(isNotHomePage && "pt-16 h-full flex-grow")}>
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
