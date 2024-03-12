import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      </head>
      <body className={`bg-primary-4 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
