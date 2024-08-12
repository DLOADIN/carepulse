import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import { cn } from '@/lib/utils'

const Mainfont = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-sans'
  });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "A healthcare Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={cn('min-h-screen bg-black font-sans antialiased', Mainfont.variable)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
