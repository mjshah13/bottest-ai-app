import React from "react";
import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignIn routing="hash" />
    </div>
  );
};

export default Login;
