"use client";
import { UserButton, useAuth, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session } = useSession();
  const router = useRouter();

  const { userId } = useAuth();

  return (
    <div className="h-screen bg-[#fdfcfa] flex items-center justify-center">
      <div className="flex flex-col gap-y-8">
        <img className="h-11" src="/Assets/Logo.svg" alt="Your Company" />
        <div className="w-[434px] h-[400px] bg-white rounded-lg border border-lightgray">
          <div className="border-b border-lightgray h-[98px] flex flex-col justify-center items-center">
            <h1 className="text-2xl text-black font-semibold font-poppin">
              Welcome!
            </h1>
            <p className="text-lg text-black font-normal font-poppin">
              Please click the button to go on Sign in.
            </p>
          </div>
          <div className=" h-3/4 flex items-center justify-center">
            {userId ? (
              <div className="flex gap-2 items-center flex-col">
                <h1 className="text-xl text-black font-semibold font-poppin">
                  {session && "You're Already Sign in as!"}
                </h1>
                <div className="flex items-center gap-5">
                  <UserButton afterSignOutUrl="/" />
                  <h3 className="font-normal text-black font-poppin">
                    {session?.user?.fullName
                      ? session?.user?.fullName
                      : session?.user?.username}
                  </h3>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => router.push("/app/dashboard")}
                    className=" px-4 py-2 border flex w-full items-center justify-center h-full font-poppin  border-secondary rounded-md  bg-indigo-600 text-base font-medium text-secondary shadow-sm hover:bg-indigo-700"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full flex px-3 gap-2">
                  <div className="w-[50%]">
                    <button
                      onClick={() => router.push("/sign-in")}
                      className=" border flex w-full items-center justify-center h-full font-poppin border-secondary rounded-md  bg-indigo-600 text-base font-medium text-secondary shadow-sm hover:bg-indigo-700"
                    >
                      Sign in
                    </button>
                  </div>

                  <div className="w-[50%]">
                    <button
                      onClick={() => router.push("/sign-up")}
                      // href="/sign-up"
                      className=" border flex w-full items-center justify-center h-full font-poppin  border-secondary   rounded-md  bg-indigo-600 px-4 py-2 text-base font-medium text-secondary shadow-sm hover:bg-indigo-700"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center mt-10">
            <h1 className="text-[#8f9090] font-medium text-lg font-poppin">
              Copyright © bottest.ai 2024
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
