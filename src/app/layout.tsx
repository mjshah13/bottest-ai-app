import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Theme>{children}</Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
