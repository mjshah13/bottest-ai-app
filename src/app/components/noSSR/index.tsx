import dynamic from "next/dynamic";
import React from "react";

// Define the type for props
interface NoSsrProps {
  children: React.ReactNode;
}

// Define the NoSsr component
const NoSsr: React.FC<NoSsrProps> = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

// Export the component with SSR disabled
export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
