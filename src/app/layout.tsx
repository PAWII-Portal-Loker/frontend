import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import LoginDialog from "@/components/common/loginDialog";
import RegisterDialog from "@/components/common/registerDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PortalLoker",
  applicationName: "PortalLoker",
  keywords: ["job", "portal", "loker", "job portal"],
  referrer: "no-referrer",
  abstract: "PortalLoker is a job portal for job seekers and employers",
  bookmarks: "yes",
  category: "job portal",
  classification: "job portal",
  description: "PortalLoker is a job portal for job seekers and employers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
