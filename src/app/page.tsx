"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useSession } from "@clerk/clerk-react";

export default function Home() {
  // const { sessionId } = useAuth();
  const { session } = useSession();

  console.log(session);

  return (
    <div className="h-screen bg-[#fdfcfa] flex items-center justify-center">
      <div className="flex flex-col gap-y-8">
        <img className="h-11" src="/Assets/Logo.svg" alt="Your Company" />
        <div className="w-[434px] h-[400px] bg-white rounded-lg border border-lightgray">
          <div className="border-b border-lightgray h-[98px] flex flex-col justify-center items-center">
            <h1 className="text-2xl text-black font-semibold">Welcome!</h1>
            <p className="text-lg text-black font-normal">
              Please click the button to go on Sign in.
            </p>
          </div>
          <div className=" h-3/4 flex items-center justify-center">
            {session ? (
              <div className="flex gap-2 items-center flex-col">
                <h1 className="text-xl text-black font-semibold">
                  {session && "You're Already Sign in as!"}
                </h1>
                <div className="flex items-center gap-5">
                  <UserButton afterSignOutUrl="/" />
                  {session?.user?.fullName
                    ? session?.user?.fullName
                    : session?.user?.username}
                </div>
              </div>
            ) : (
              <>
                <div className="w-full flex px-3 gap-2">
                  <div className="w-[50%]">
                    <a
                      href="/sign-in"
                      className=" border flex w-full items-center justify-center h-full  border-secondary rounded-md  bg-indigo-600 text-base font-medium text-secondary shadow-sm hover:bg-indigo-700"
                    >
                      Sign in
                    </a>
                  </div>

                  <div className="w-[50%]">
                    <a
                      href="/sign-up"
                      className=" border flex w-full items-center justify-center h-full   border-secondary   rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-secondary shadow-sm hover:bg-indigo-700"
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center mt-10">
            <h1 className="text-[#8f9090] font-medium text-lg">
              Copyright © bottest.ai 2024
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
