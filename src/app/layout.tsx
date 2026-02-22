import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saveur | Fine Dining Restaurant - Experience Culinary Excellence",
  description: "Saveur is an elegant fine dining restaurant offering an unforgettable culinary experience. Book your table today and discover exquisite flavors crafted by our award-winning chefs.",
  keywords: ["fine dining", "restaurant", "gourmet", "luxury dining", "reservation", " Saveur"],
  authors: [{ name: "BitLuse" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    title: "Saveur | Fine Dining Restaurant",
    description: "Experience culinary excellence at Saveur - Where every dish tells a story of passion and perfection",
    url: "https://saveur.restaurant",
    siteName: "Saveur Restaurant",
    type: "website",
    images: [
      {
        url: "/images/hero-restaurant.png",
        width: 1200,
        height: 630,
        alt: "Saveur Restaurant Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saveur | Fine Dining Restaurant",
    description: "Experience culinary excellence at Saveur",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
