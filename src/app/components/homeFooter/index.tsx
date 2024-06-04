import React from "react";
import { homeFooterNavData } from "../../../utils/common";
import Link from "next/link";

type Props = {
  title: string;
  cta?: boolean;
};

export const HomeFooter: React.FC<Props> = ({ title, cta = true }) => {
  return (
    <div>
      {cta && (
        <section className="px-8 sm:px-0 bg-home-ready-bg-m sm:bg-home-ready-bg-d py-20 sm:py-0 sm:min-h-[650px] flex flex-col items-center justify-center bg-cover rounded-[20px]">
          <h1 className="text-[28px] sm:text-[40px] md:text-[52px] text-center font-medium mb-2 sm:mb-4 text-[#212427]">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-center text-[#212427] mb-8 max-w-[100%] sm:max-w-[576px]">
            Create a free account, no credit card required. Or, take a look at the
            pricing options for a comparison of different plans.
          </p>
          <div className="flex items-center justify-center flex-col sm:flex-row w-full">
            <Link
              href={"/sign-up"}
              className="h-10 flex items-center justify-center sm:h-14 sm:mr-3 w-full sm:w-[240px] rounded-xl text-white hover:shadow-lg duration-200"
              style={{
                background:
                  "linear-gradient(93.32deg, #4596F5 0%, #176FD6 101.05%)",
              }}
            >
              Sign Up for Free
            </Link>
            <Link
              href={"/pricing"}
              className="h-10 sm:h-14 flex items-center justify-center bg-white w-full sm:w-[166px] border border-[#388AEB] rounded-xl text-[#388AEB] mt-2 sm:mt-0 hover:shadow-lg duration-200"
            >
              See pricing
            </Link>
          </div>
        </section>
      )}
      <div className="w-full bg-[#212427] rounded-[20px] text-white px-5 py-12 md:px-0 mt-8">
        <div className="hidden justify-between px-12 lg:px-[88px] md:flex">
          {homeFooterNavData.map((item, key) => (
            <div key={key}>
              <p className="uppercase font-medium text-[#ff915b] text-[13px] mb-10">
                {item.title}
              </p>
              <div className="flex flex-col items-start space-y-5">
                {item.links.map((link, key1) => (
                  <Link key={key1} href={link.href} className="text-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:hidden gap-5 grid-cols-2">
          <div>
            <div>
              <p className="text-xs uppercase font-medium mb-5 text-[#ff915b]">
                {homeFooterNavData[0].title}
              </p>
              <div className="flex flex-col items-start space-y-5">
                {homeFooterNavData[0].links.map((link, key) => (
                  <Link key={key} href={link.href} className="text-xs">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs uppercase font-medium mb-5 text-[#ff915b]">
                {homeFooterNavData[1].title}
              </p>
              <div className="flex flex-col items-start space-y-5">
                {homeFooterNavData[1].links.map((link, key) => (
                  <Link
                    key={key}
                    href={link.href}
                    className="text-xs"
                    target={link.target}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-xs uppercase font-medium mb-5 text-[#ff915b]">
                {homeFooterNavData[4].title}
              </p>
              <div className="flex flex-col items-start space-y-5">
                {homeFooterNavData[4].links.map((link, key) => (
                  <Link key={key} href={link.href} className="text-xs">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs uppercase font-medium mb-5 text-[#ff915b]">
                {homeFooterNavData[3].title}
              </p>
              <div className="flex flex-col items-start space-y-5">
                {homeFooterNavData[3].links.map((link, key) => (
                  <Link key={key} href={link.href} className="text-xs">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs uppercase font-medium mb-5 text-[#ff915b]">
                {homeFooterNavData[2].title}
              </p>
              <div className="flex flex-col items-start space-y-5">
                {homeFooterNavData[2].links.map((link, key) => (
                  <Link key={key} href={link.href} className="text-xs">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[60px] md:mt-[120px] flex justify-between px-0 md:px-12 flex-col md:flex-row text-xs">
          <span className="flex flex-col md:flex-row">
            <b className="font-normal">
              This website uses Cookies.{" "}
              <em className="mx-1 md:text-white text-transparent">-</em>{" "}
              <a href="/privacy-policy" target="_blank" className="underline">Privacy Policy</a>{" "}
              <em className="mx-1 md:text-white text-transparent">-</em>{" "}
              <a href="/terms-of-service" target="_blank" className="underline">Terms of Service</a>{" "}
            </b>
          </span>
          <span className="flex mt-10 md:mt-0 justify-center md:justify-start">
            &copy; Bot Test Inc. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};
