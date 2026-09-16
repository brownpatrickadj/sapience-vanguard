import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sapience-vanguard.netlify.app"),
  title: "Sapience Vanguard | Intelligence software for people who run the show",
  description:
    "Sapience Vanguard builds intelligence software that puts business owners, freelancers, and independent professionals in the driver's seat.",
  openGraph: {
    title: "Sapience Vanguard",
    description:
      "Software should learn the business. Not the other way around. Intelligence software for business owners, freelancers, and independent professionals.",
    siteName: "Sapience Vanguard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sapience Vanguard",
    description:
      "Software should learn the business. Not the other way around.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
