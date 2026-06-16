import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Tesla Trek | Premium Tesla Expeditions & Lifestyle | A Division of LVL X Ltd Co",
  description: "Tesla Trek is the premium expedition, provenance, and lifestyle division of LVL X Ltd Co. Real-world Tesla adventures, GPS-enabled claims, limited authenticated merch, and direct owner ecosystem programs. Headquarters: 6167 GA 254, Cleveland, Georgia 30528 USA. Contact: joe@lvlltd.com | joe@tesla-trek.com | 706-768-0803",
  icons: {
    icon: "/next.svg",
  },
  openGraph: {
    title: "Tesla Trek | Premium Tesla Expeditions & Lifestyle",
    description: "A Division of LVL X Ltd Co • 6167 GA 254, Cleveland, Georgia 30528 USA",
    images: [{ url: "/next.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
