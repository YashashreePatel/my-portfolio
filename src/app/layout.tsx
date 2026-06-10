import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from '@/components/style.module.css';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: 'Yashashree Patel',
  description: 'Portfolio website for Yashashree Patel - Software Engineer',
  keywords: 'Yashashree, Patel, Software Developer, Software Engineer, Newgrad, Boston, California, USA, US'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/favicon2.ico" />
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap" /> */}
      </head>
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
