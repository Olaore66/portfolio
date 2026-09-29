import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Providers from "@/components/Providers";
import { profile } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.tagline,
};

export const viewport = {
  themeColor: "#071013",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
