/* eslint-disable react/no-unescaped-entities */

import "./globals.css";
import "@radix-ui/themes/styles.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import dynamic from "next/dynamic";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalStateProvider } from "../globalStateProvider";
import { ThemeProvider } from "../ themeProvider";
import { ToastContainer } from "react-toastify";
import { Theme } from "@radix-ui/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "bottest.ai | %s",
    default: "bottest.ai | Chatbot Testing Done Right",
  },
  description: "...",
};

const TopProgressBar = dynamic(
  () => {
    return import("./components/TopProgressBar");
  },
  { ssr: false }
);

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />

          <ThemeProvider attribute="class" defaultTheme="light">
            <GlobalStateProvider>
              <Theme>{children}</Theme>
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
            <TopProgressBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
export default Layout;
