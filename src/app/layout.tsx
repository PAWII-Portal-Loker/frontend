import type { Metadata } from 'next';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

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
      <body className="bg-gray-100 text-gray-900">
        <Provider>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
