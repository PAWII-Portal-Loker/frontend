import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PortalLoker',
  applicationName: 'PortalLoker',
  keywords: ['job', 'portal', 'loker', 'job portal'],
  referrer: 'no-referrer',
  abstract: 'PortalLoker is a job portal for job seekers and employers',
  bookmarks: 'yes',
  category: 'job portal',
  classification: 'job portal',
  description: 'PortalLoker is a job portal for job seekers and employers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <Provider>
          <Navbar />
          <Toaster />
          <section className="container mx-auto p-4 mt-16">{children}</section>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
