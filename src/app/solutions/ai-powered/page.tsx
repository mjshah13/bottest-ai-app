"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AIPoweredPage = () => {
  return (
    <div>
      <div className="bg-home-hero-bg-m md:bg-home-hero-bg-d bg-no-repeat bg-cover rounded-[20px] px-7 md:px-14 lg:px-[100px] pt-20 pb-10 md:py-[120px] mb-3 md:mb-8 flex flex-col md:flex-row items-center">
        <div className="max-w-[530px] w-full mr-4 text-center md:text-left mb-7 md:mb-0">
          <h1 className="text-[40px] md:text-[52px] font-medium leading-[48px] md:leading-[60px] mb-3 text-[#212427]">
            AI-Powered Coverage
          </h1>
          <p className="text-base text-[#616A73] tracking-tight">
            {
              "Due to the intrinsically obscure nature of how LLMs are structured (often the case with any significantly large machine learning model), determining behavior when inputs are changed can be difficult and unpredictable. Recent research shows that for LLMs in particular, extremely "
            }
            <a href="https://arxiv.org/html/2401.03729v2" target="_blank" className="text-[#388AEB] underline">
              subtle changes in a prompt can result in dramatically different
              responses.
            </a>
          </p>
        </div>
        <div className="w-full">
          <Image
            src="/assets/solution/ai-powered.svg"
            alt="ai-powered"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="mb-3 md:mb-8 bg-[#F7F9FB] rounded-[20px] p-7 md:p-12 lg:p-[100px] flex flex-col md:flex-row">
        <div className="max-w-full h-[320px] md:h-auto md:max-w-[480px] w-full rounded-[20px] flex items-center justify-center border border-[#D6E6F7] bg-[#FFFFFF33] md:mr-4 mt-2 md:mt-0 order-2 md:order-1 relative">
          {/* <Image
            src={"/assets/solution/ai-powered.svg"}
            fill
            alt=""
            objectFit="cover"
          /> */}
          <span className="text-[#D6E6F7] text-[40px] font-medium">
            placeholder
          </span>
        </div>
        <div className="w-full order-1 md:order-2">
          <div className="bg-white border border-[#D6E6F7] p-6 md:p-8 text-sm text-[#616A73] rounded-[20px] mb-2 md:mb-4">
            {
              "When deploying your chatbot to production to serve real users, it’s crucial to expect variation in how questions are asked. Ensuring complete coverage over the different phrasing of the same prompts is just as important as testing the original prompt itself. You can’t expect users to only query your chatbot in the exact way that you’ve tested."
            }
          </div>
          <div className="bg-white border border-[#D6E6F7] p-6 md:p-8 text-sm text-[#616A73] rounded-[20px]">
            {
              "bottest.ai allows you to automatically generate any number of Variants (slightly different phrasings of each question) for your Tests, that will help ensure complete coverage for your live users. These Variants are fully managed within a Test and used during the evaluation process along with the original prompts. You can set a default number of Variants on a Suite level which will have Variants created after a Test is recorded, or individually modify the number of Variants on a Test level."
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPoweredPage;
