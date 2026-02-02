import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Ankit Tiwari | Full-Stack Developer & Solutions Architect",
  description: "Full-Stack Developer with 2+ years building scalable production systems. Specializing in React, Next.js, Node.js, and modern web technologies. Available for remote & on-site roles.",
  keywords: "Full-Stack Developer, React, Next.js, Node.js, JavaScript, Web Developer, MERN, Portfolio",
  authors: [{ name: "Ankit Tiwari" }],
  creator: "Ankit Tiwari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankittiwari.dev",
    siteName: "Ankit Tiwari Portfolio",
    title: "Ankit Tiwari | Full-Stack Developer",
    description: "Building scalable, high-performance web solutions",
    images: [{
      url: "/assets/og-image.png",
      width: 1200,
      height: 630,
      alt: "Ankit Tiwari Portfolio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Tiwari | Full-Stack Developer",
    description: "Building scalable, high-performance web solutions",
  },
  icons: {
    icon: "/assets/favicon32.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
