import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/app/provider";

const fixel = localFont({
  src: [
    { path: "./fonts/FixelDisplay-Regular.woff2", weight: "400" },
    { path: "./fonts/FixelDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/FixelDisplay-SemiBold.woff2", weight: "600" },
    { path: "./fonts/FixelDisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-fixel",
});

export const metadata: Metadata = {
  title: "VocaBuilder",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fixel.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
