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
import { useIsNotHomePage } from "@utils/checkPathName";
import useAuthStore from "@auth/store";
import ProfileDialog from "@components/layouts/auth/profileDialog";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { auth, checkLogin } = useAuthStore();
  const isNotHomePage = useIsNotHomePage();

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <body className={clsx(inter.className, "flex flex-col min-h-screen")}>
        <Provider>
          {isNotHomePage && <Navbar />}
          <Toaster />
          <main
            className={clsx(
              isNotHomePage &&
                "pt-16 h-full flex-grow dark:text-slate-100 text-slate-700 bg-gradient-to-r from-slate-200 to-slate-400 dark:from-slate-400 dark:to-slate-600"
            )}
          >
            {auth.role ? (
              <ProfileDialog />
            ) : (
              <>
                <LoginDialog />
                <RegisterDialog />
                <RoleDialog />
              </>
            )}
            {children}
          </main>
          {isNotHomePage && <Footer />}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
