import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "BetterBench — Not all benchmarks are created equal",
  description:
    "Rate and compare AI benchmarks and leaderboards. Editorial scores across 6 quality criteria, community voting, and transparent methodology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="border-b border-border sticky top-0 z-50 bg-background/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-xl italic text-foreground">
                BetterBench
              </span>
              <span className="text-muted text-xs hidden sm:inline font-mono">
                v0.1
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-muted hover:text-foreground transition-colors"
              >
                Rankings
              </Link>
              <Link
                href="/methodology"
                className="text-muted hover:text-foreground transition-colors"
              >
                Methodology
              </Link>
              <Link
                href="/submit"
                className="text-muted hover:text-foreground transition-colors"
              >
                Submit
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border mt-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>
              BetterBench — Rating the raters since 2025
            </p>
            <p>
              Built by{" "}
              <a
                href="https://sandraherz.com/ai-leaderboards/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                humans who read the fine print
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
