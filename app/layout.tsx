import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torched — Brutally Honest Website Feedback",
  description: "Paste a URL and get a brutally honest, AI-powered roast of your website. Design, copy, UX, and vibe — no mercy, no fluff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
