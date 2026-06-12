import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import { PageTransitionProvider } from "@/components/PageTransitionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel"
});

export const metadata: Metadata = {
  title: "Lovedex — seu amor em dados",
  description: "Seu amor em dados, em formato de card retrô compartilhável."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${pixelify.variable} font-sans`}>
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
