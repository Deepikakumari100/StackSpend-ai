import './globals.css';
import React from 'react';

export const metadata = {
  title: 'StackSpend Backend',
  description: 'AI spend audit backend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
