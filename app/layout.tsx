import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSnaps | Share the way you code",
  description: "A visual home for beautiful code snippets and terminal themes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
