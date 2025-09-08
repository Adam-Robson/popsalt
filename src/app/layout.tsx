import type { Metadata } from "next";
import { Barlow, SUSE } from "next/font/google";
import "@/styles/globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const suse = SUSE({
  variable: "--font-suse",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Website for LE FOG",
  description: "LE FOG is a band from Portland, Oregon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${suse.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
