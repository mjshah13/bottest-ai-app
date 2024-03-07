
import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Sidenav from "@/components/Sidenav/Sidenav";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Sidenav>
            {children}
          </Sidenav>
         
        </AntdRegistry>
      </body>
    </html>
  );
}
