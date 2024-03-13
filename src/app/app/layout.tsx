import Sidenav from "@/app/components/Sidenav/Sidenav";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fdfcfa]"  >
      <Sidenav>{children}</Sidenav>
    </div>
  );
}

export default Layout;
