import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Bilal | Terminal Portfolio',
  description: 'Interactive CLI-themed portfolio. SWE | Cybersecurity Enthusiast. Type commands to explore.',
  keywords: ['Muhammad Bilal', 'portfolio', 'developer', 'terminal', 'CLI', 'cybersecurity', 'software engineer'],
  authors: [{ name: 'Muhammad Bilal' }],
  openGraph: {
    title: 'Muhammad Bilal | Terminal Portfolio',
    description: 'Interactive CLI-themed portfolio. SWE | Cybersecurity Enthusiast.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-terminal-black">
        {/* CRT Effects Overlay */}
        <div className="crt-overlay" />
        <div className="scanline" />

        {/* Main Content */}
        <main className="screen-flicker">
          {children}
        </main>
      </body>
    </html>
  );
}
