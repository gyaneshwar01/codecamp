import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import QueryProvider from "@/components/providers/QueryProvider";
import "simplebar-react/dist/simplebar.min.css";

export const metadata: Metadata = {
  title: "DocTalk Bot",
  description: "Chat flawlessly with your pdf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
