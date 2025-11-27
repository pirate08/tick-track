import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'TickTrack',
  description: 'Plan, track, and tick off your daily tasks with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
