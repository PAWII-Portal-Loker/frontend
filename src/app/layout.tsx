"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import LoginDialog from "@/components/common/loginDialog";
import RegisterDialog from "@/components/common/registerDialog";
import useMainStore from "@/hooks/mainStore";
import useStore from "@/contexts/auth/reducer";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsLoginDialogOpen } = useMainStore();
  const { isAuthenticated, checkLogin } = useStore();

  useEffect(() => {
    checkLogin();
    if (isAuthenticated) {
      setIsLoginDialogOpen(false);
    }
  }, [checkLogin, isAuthenticated, setIsLoginDialogOpen]);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-700 text-gray-100`}>
        <Provider>
          <Navbar />
          <Toaster />
          <main className="mt-16">
            <LoginDialog />
            <RegisterDialog />
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
