import "~/styles/globals.css";
import localFont from "next/font/local";
import { type Metadata } from "next";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SuperTracker",
  description: "Easiest way to organize your tasks",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistMono.className}`}>
      <body className="dark">{children}</body>
    </html>
  );
}
