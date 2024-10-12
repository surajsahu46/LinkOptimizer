import type { Metadata } from "next";
import { cn } from "@/lib";
import { Footer, SessionProvider, ThemeProvider, Toaster } from "@/components";
import '@fontsource/yantramanav';
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkOptimizer",
  description: "LinkOptimizer is a powerful URL shortening service that allows you to create compact and shareable links. With user-friendly features and an elegant interface, it is the perfect tool to make your long URLs more manageable and easy to share. Simplify your links with LinkOptimizer!",
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* Updated language to English */}
      <head>
        <link rel="icon" href="/LinkOptimizer-logo.ico" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased"
      )} style={{ fontFamily: "'Yantramanav', sans-serif" }}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Background */}
            <div className="absolute top-0 z-[-2] h-screen w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(198,157,119,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(28,16,3,100),rgb(20,13,2))]"></div>

            {children}
            <Footer />
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 5000,
              }}
            />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
