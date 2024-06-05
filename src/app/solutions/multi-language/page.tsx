"use client";
import Image from "next/image";
import React from "react";

const MultiLanguagePage = () => {
  return (
    <div>
      <div className="bg-home-hero-bg-m md:bg-home-hero-bg-d bg-no-repeat bg-cover rounded-[20px] px-7 md:px-14 lg:px-[100px] pt-20 pb-10 md:py-[120px] mb-3 md:mb-8 flex flex-col md:flex-row items-center">
        <div className="max-w-[530px] w-full mr-4 text-center md:text-left mb-7 md:mb-0">
          <h1 className="text-[40px] md:text-[52px] font-medium leading-[48px] md:leading-[60px] mb-3 text-[#212427]">
            Multi-Language Testing
          </h1>
          <p className="text-base text-[#616A73] tracking-tight">
            {
              "When deploying your chatbot globally, it’s critical to ensure functionality is consistent across the many different languages your business might have support for."
            }
            <br />
            <br />
            Manual testing across multiple languages by QA teams or developers
            can be an extremely time consuming process. As your number of Test
            cases increase, managing the other languages inhouse will result in
            increasingly cumbersome workflows.
          </p>
        </div>
        <div className="w-full">
          <Image
            src="/assets/solution/multi-language.svg"
            alt="multi-language"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="mb-3 md:mb-8 bg-[#F7F9FB] rounded-[20px] p-7 md:p-12 lg:p-[100px] flex flex-col md:flex-row">
        <div className="max-w-full h-[320px] md:h-auto md:max-w-[635px] w-full rounded-[20px] flex items-center justify-center border border-[#D6E6F7] bg-[#FFFFFF33] md:mr-12 lg:mr-[100px] mt-2 md:mt-0 order-2 md:order-1 relative">
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
          <div className="text-sm text-[#616A73] mb-2 md:mb-5">
            {
              "The bottest.ai Test Repository will automatically generate the language alternatives of both prompts and expected results for each Test. During the evaluation process, bottest.ai will execute and evaluate Tests in the selected languages (translating any custom evaluation criteria if applicable), and re-translate any failure reasons back to English for convenience."
            }
          </div>
          <div className="bg-white border border-[#D6E6F7] p-6 md:p-8 text-sm text-[#616A73] rounded-[20px]">
            {"In just a few clicks, bottest.ai allows you to easily include any number of languages in your Test coverage. You can specify to include multiple languages for an entire Suite, or individual Tests."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguagePage;
