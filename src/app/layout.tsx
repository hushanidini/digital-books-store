import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner"

// Import CSS without type checking
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digital Books Store - Programming & Tech Books',
  description: 'Buy and download digital programming books instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ `${inter.className} font-poppins `}>
        <main>{children}</main>
        <Toaster position="top-center" richColors  />
      </body>
    </html>
  );
}