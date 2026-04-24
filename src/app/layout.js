import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Captionly — AI Video Captions",
  description: "AI-powered video caption generator",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col text-white font-(--font-inter) tracking-tight"
        style={{
          background: "#070f1a",
          backgroundImage: "radial-gradient(ellipse 80% 500px at 50% 0px, rgba(16,185,129,0.08) 0%, transparent 100%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <div className="flex-1 w-full max-w-5xl mx-auto px-6">
            {children}
          </div>
          <Toaster /> 
        </ThemeProvider>
      </body>
    </html>
  );
}