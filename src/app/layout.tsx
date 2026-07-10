import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhilesh Aravapalli | Cyber Command Center Portfolio",
  description: "Explore the cybersecurity and cloud engineering portfolio of Nikhilesh Aravapalli. Designed as a futuristic SOC (Security Operations Center) dashboard.",
  keywords: [
    "Nikhilesh Aravapalli",
    "Cybersecurity Portfolio",
    "Cloud Engineer Portfolio",
    "Security Operations Center Dashboard",
    "RAG Chatbot",
    "Cryptographic Vault",
    "SRM University AP",
    "AWS Certified Cloud Practitioner",
    "Cyber Command Center"
  ],
  authors: [{ name: "Nikhilesh Aravapalli" }],
  openGraph: {
    title: "Nikhilesh Aravapalli | Cyber Command Center Portfolio",
    description: "Futuristic SOC Dashboard Portfolio of Nikhilesh Aravapalli, specializing in Cybersecurity and Cloud Architecture.",
    url: "https://nikhilesharavapalli.dev", // placeholder, but good for SEO
    siteName: "Nikhilesh Aravapalli Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cyber Command Center SOC Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhilesh Aravapalli | Cyber Command Center Portfolio",
    description: "Futuristic SOC Dashboard Portfolio of Nikhilesh Aravapalli, specializing in Cybersecurity and Cloud Architecture.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050816] text-[#e2e8f0]">
        {children}
      </body>
    </html>
  );
}
