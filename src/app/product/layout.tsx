import React from "react";
import HomeHeader from "../components/homeHeader";
import { HomeFooter } from "../components/homeFooter";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product"
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <HomeHeader />
      <div className="max-w-[1440px] m-auto w-full px-3 md:px-8 pt-[72px] pb-3 lg:pt-[104px] md:pb-8">
        <div className="w-[100%]">{children}</div>
        <HomeFooter title="Ready to get started?" />
      </div>
    </div>
  );
}
export default Layout;
