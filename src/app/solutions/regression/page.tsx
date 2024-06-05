"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const RegressionPage = () => {
  return (
    <div className="">
      <div className="bg-home-hero-bg-m md:bg-home-hero-bg-d bg-no-repeat bg-cover rounded-[20px] px-7 md:px-14 lg:px-[100px] pt-20 pb-10 md:py-[120px] mb-3 md:mb-8 flex flex-col md:flex-row items-center">
        <div className="max-w-[530px] w-full mr-4 text-center md:text-left mb-7 md:mb-0">
          <h1 className="text-[40px] md:text-[52px] font-medium leading-[48px] md:leading-[60px] mb-3 text-[#212427]">
            Regression Testing
          </h1>
          <p className="text-base text-[#616A73] tracking-tight">
            {
              "Ensure a thorough and comprehensive analysis of your chatbot’s functionality through the use of our LLM-based Test Evaluator."
            }
            <br />
            <br />
            Following the best practices in regression testing for software, our
            platform allows your flexibility to customize the testing of your
            chatbot with ease.
          </p>
        </div>
        <div className="w-full">
          <Image
            src="/assets/solution/regression.svg"
            alt="regression"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="hidden md:block mb-8">
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-8 text-[40px] font-medium tracking-tight leading-[46px]">
            Linguistic Analysis with Customized Criteria
          </h1>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "Our Test Evaluator allows the user to customize evaluation instructions and criteria to follow when determining a result, both on a Suite and an individual Test level. "
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                Our Test Evaluator allows the user to customize evaluation
                instructions and criteria to follow when determining a result,
                both on a Suite and an individual Test level.
                <br />
                <br />
                This ensures that even nuanced and complex Test results are
                evaluated with utmost accuracy and context on the specific
                requirements of your application.
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/regression/1.png"}
                fill
                alt="regression-1"
                objectFit="cover"
                className="scale-105"
              />
            </div>
          </div>
        </div>
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-8 text-[40px] font-medium tracking-tight leading-[46px]">
            Check Response Consistency
          </h1>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "Chatbots will often provide different responses when prompted with the same question. It’s important that the product you ship is consistent in quality for each of your users."
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                {
                  "Our Test Evaluator will run multiple iterations of each Test to check the consistency of responses. Customize the number of iterations on a Suite level, or configure them on each Test individually, to ensure quality for all of your users."
                }
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/regression/2.png"}
                fill
                alt="regression-2"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-3 text-[40px] font-medium tracking-tight leading-[46px]">
            Evaluation with Multiple Correct Answers
          </h1>
          <p className="text-base mb-8 text-[#616A73]">
            {
              "Some user inquiries with your chatbot may only have one answer that is deemed valid or correct, such as when a user is attempting to jailbreak a system (see our protection against this with "
            }
            <a href="/solutions/adversarial" className="text-[#388AEB] underline">
              Adversarial Testing
            </a>
            {")."}
          </p>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "However, some inquiries may have multiple correct or valid answers that should be considered, for example responding with a summary of a resource or a direct link to it. "
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                {
                  "Our Test Evaluator gives you the flexibility to define multiple Baselines for each Test to ensure that all evaluations are accurate and appropriate. During the evaluation process, we check that the chatbot’s response passes to at least one Baseline."
                }
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/regression/3.png"}
                fill
                alt="regression-3"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-8 text-[40px] font-medium tracking-tight leading-[46px]">
            Root Cause Identification of Failed Tests
          </h1>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "Understanding why a Test is failing is just as important as knowing that a Test fails in the first place."
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                {
                  "When an evaluation fails, a detailed description of exactly why will be provided to the user. Upon running full Suite Runs, a comprehensive report is generated to both summarize failures from a glance as well as give insight on a granular level."
                }
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/regression/4.png"}
                fill
                alt="regression-4"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden bg-[#F7F9FB] p-3 rounded-[20px] mb-3">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className="mySwiper pb-12"
          spaceBetween={16}
        >
          <SwiperSlide className="h-auto">
            <div className="px-3 pt-8 pb-3 border border-dashed border-[#388AEB] rounded-[20px] h-full flex flex-col">
              <h1 className="mb-1 text-2xl font-medium tracking-tight">
                Evaluation with Multiple Correct Answers
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "Some inquiries may have multiple correct or valid answers that should be considered, for example responding with a summary of a resource or a direct link to it. Our Test Evaluator gives you the flexibility to define multiple Baselines for each Test to ensure that all evaluations are accurate and appropriate. During the evaluation process, we check that the chatbot’s response passes to at least one Baseline."
                  }
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/regression/1.png"}
                    fill
                    alt="regression-1"
                    objectFit="cover"
                    className="scale-105"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <div className="px-3 pt-8 pb-3 border border-dashed border-[#388AEB] rounded-[20px] h-full flex flex-col">
              <h1 className="mb-1 text-2xl font-medium tracking-tight">
                Consistency Across Multiple Responses
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "Chatbots will often provide different responses when prompted with the same question. It’s important that the product you ship is consistent in quality for each of your users. Our Test Evaluator will run multiple iterations of each Test to check the consistency of responses. Customize the number of iterations on a Suite level, or configure them on each Test individually, to ensure quality for all of your users."
                  }
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/regression/2.png"}
                    fill
                    alt="regression-2"
                    objectFit="cover"
                    className="scale-105"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <div className="px-3 pt-8 pb-3 border border-dashed border-[#388AEB] rounded-[20px] h-full flex flex-col">
              <h1 className="mb-1 text-2xl font-medium tracking-tight">
                Linguistic Analysis with Customized Criteria
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "Our Test Evaluator allows the user to customize evaluation instructions and criteria to follow when determining a result, both on a Suite and an individual Test level. This ensures that even nuanced and complex Test results are evaluated with utmost accuracy and context on the specific requirements of your application."
                  }
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/regression/3.png"}
                    fill
                    alt="regression-3"
                    objectFit="cover"
                    className="scale-105"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-auto">
            <div className="px-3 pt-8 pb-3 border border-dashed border-[#388AEB] rounded-[20px] h-full flex flex-col">
              <h1 className="mb-1 text-2xl font-medium tracking-tight">
                Root Cause Identification of Failed Tests
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "Understanding why a Test is failing is just as important as knowing that a Test fails in the first place. When an evaluation fails, a detailed description of exactly why will be provided to the user. Upon running full Suite Runs, a comprehensive report is generated to both summarize failures from a glance as well as give insight on a granular level. "
                  }
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/regression/4.png"}
                    fill
                    alt="regression-4"
                    objectFit="cover"
                    className="scale-105"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default RegressionPage;
