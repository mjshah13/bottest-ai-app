import "./globals.css";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";

import { Poppins } from "next/font/google";

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
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className={poppins.variable}>
            <Theme>{children}</Theme>
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
