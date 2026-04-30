import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://cineflix.example.com"),
  title: { default: "CineFlix — Watch Movies & TV Shows Online", template: "%s | CineFlix" },
  description: "Stream the latest movies and TV series in HD. Discover trending titles, top-rated picks, and explore by genre on CineFlix.",
  keywords: ["movies", "tv shows", "streaming", "watch online", "free movies", "hd movies", "series"],
  openGraph: {
    title: "CineFlix — Watch Movies & TV Shows Online",
    description: "Stream the latest movies and TV series in HD.",
    type: "website",
    siteName: "CineFlix"
  },
  twitter: { card: "summary_large_image", title: "CineFlix", description: "Watch movies and TV shows online." },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://api.themoviedb.org" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
