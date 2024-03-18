"use client";

import { SignIn } from "@clerk/nextjs";

import { useEffect, useState } from "react";

export default function Home({ children }: { children: any }) {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
