import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TOTS MAP",
  description: "map for tots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen antialiased`}>
        <header className="flex">
          <Navbar />
        </header>
        <main className="flex h-full flex-col md:flex-row md:overflow-hidden">
          {/* <div className="w-full flex-none md:w-64 bg-blue-200"></div> */}
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
