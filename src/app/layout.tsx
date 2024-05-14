/* eslint-disable react/no-unescaped-entities */

"use client";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import { Poppins } from "next/font/google";
import { GlobalStateProvider } from "../globalStateProvider";
import { ThemeProvider } from "../ themeProvider";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    console.log("Stored theme from localStorage:", storedTheme);

    // Assuming theme is initially set to "light" if not found in localStorage
    const theme = storedTheme || "light";

    console.log("Selected theme:", theme);
  }, []);

  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: storedTheme === "light" ? dark : undefined,
    // }}
    >
      <html lang="en">
        <body>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          />

          <div>
            <GlobalStateProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                // enableSystem
              >
                <Theme className={poppins.variable}>{children}</Theme>
              </ThemeProvider>
            </GlobalStateProvider>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
