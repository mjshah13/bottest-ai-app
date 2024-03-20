
import React from "react";
import Sidenav from "../components/sidenav/Sidenav";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fdfcfa]">
      <Sidenav>{children}</Sidenav>
    </div>
  );
}

export default Layout;
