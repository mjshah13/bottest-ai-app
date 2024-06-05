"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const PerformancePage = () => {
  return (
    <div>
      <div className="bg-home-hero-bg-m md:bg-home-hero-bg-d bg-no-repeat bg-cover rounded-[20px] px-7 md:px-14 lg:px-[100px] pt-20 pb-10 md:py-[120px] mb-3 md:mb-8 flex flex-col md:flex-row items-center">
        <div className="max-w-[530px] w-full mr-4 text-center md:text-left mb-7 md:mb-0">
          <h1 className="text-[40px] md:text-[52px] font-medium leading-[48px] md:leading-[60px] mb-3 text-[#212427] tracking-tight">
            Performance Testing
          </h1>
          <p className="text-base text-[#616A73] tracking-tight">
            For users, the time it takes for your chatbot to respond to a
            request matters.
            <br />
            <br />
            The bottest.ai Execution Engine keeps track of latency from the
            chatbot across all responses, compiling this information so you can
            track performance over time.
          </p>
        </div>
        <div className="w-full">
          <Image
            src="/assets/solution/performance.svg"
            alt="performance"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="hidden md:block mb-8">
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-8 text-[40px] font-medium tracking-tight leading-[46px]">
            Runtime Distribution Across Tests
          </h1>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "Even when asking the same question, the response time from your chatbot can vary. However, when manually testing it’s hard to tell if long wait times is just a red herring or is a trend across all your conversations."
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                You can view the runtime distribution across your entire Test
                Suite in the Analytics Platform, and averages for each specific
                Test. You can view your trends over time, as well as specific
                times after a Suite Run.
                <br />
                This is particularly important when comparing different LLM
                models in your chatbot architecture, or even comparing new
                releases of the same model.
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/performance/1.png"}
                fill
                alt="performance-1"
                objectFit="cover"
                className="scale-105"
              />
            </div>
          </div>
        </div>
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-8 text-[40px] font-medium tracking-tight leading-[46px]">
            Performance Degradation Identification
          </h1>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "When reviewing reports generated in the Analytics Platform, it’s important for you to quickly understand where improvement is most needed in your chatbot. "
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                {
                  "The average runtime of each Test in a Suite Run is compared to its average in a previous Suite Run (that you can configure) to help you quickly identify which Tests have large changes in their performance."
                }
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/performance/2.png"}
                fill
                alt="performance-2"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="md:px-12 lg:px-[100px] lg:py-20 md:py-10 bg-[#F7F9FB] rounded-[20px] mb-8">
          <h1 className="mb-8 text-[40px] font-medium tracking-tight leading-[46px]">
            Accurate User Load Benchmarking
          </h1>
          <div className="flex">
            <div className="flex-1 mr-4 flex flex-col text-sm text-[#616A73]">
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center mb-4">
                {
                  "The response time of a chatbot can vary heavily depending on the number of concurrent users it needs to serve. In order to accurate achieve performance testing results, the bottest.ai Execution Engine will execute Tests with a configurable level of concurrency to mimic production conditions."
                }
              </div>
              <div className="h-full rounded-[20px] border border-[#D6E6F7] py-2 px-8 bg-white flex items-center">
                {
                  "Testing with high concurrency will ensure that your chatbot can handle the anticipated usage volume without delays, providing insights into the real response times your users will face in production."
                }
              </div>
            </div>
            <div className="h-[400px] flex-1 max-w-[480px] rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
              <Image
                src={"/assets/solution/performance/3.png"}
                fill
                alt="performance-3"
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
                Runtime Distribution Across Tests
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "Even when asking the same question, the response time from your chatbot can vary. However, when manually testing it’s hard to tell if long wait times is just a red herring or is a trend across all your conversations."
                  }
                  You can view the runtime distribution across your entire Test
                  Suite in the Analytics Platform, and averages for each
                  specific Test. You can view your trends over time, as well as
                  specific times after a Suite Run. This is particularly
                  important when comparing different LLM models in your chatbot
                  architecture, or even comparing new releases of the same
                  model.
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/performance/1.png"}
                    fill
                    alt="performance-1"
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
                Performance Degradation Identification
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "When reviewing reports generated in the Analytics Platform, it’s important for you to quickly understand where improvement is most needed in your chatbot. The average runtime of each Test in a Suite Run is compared to its average in a previous Suite Run (that you can configure) to help you quickly identify which Tests have large changes in their performance."
                  }
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/performance/2.png"}
                    fill
                    alt="performance-2"
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
                Accurate User Load Benchmarking
              </h1>
              <div className="flex-1 flex flex-col">
                <div className="mb-3 text-sm">
                  {
                    "The response time of a chatbot can vary heavily depending on the number of concurrent users it needs to serve. In order to accurate achieve performance testing results, the bottest.ai Execution Engine will execute Tests with a configurable level of concurrency to mimic production conditions. Testing with high concurrency will ensure that your chatbot can handle the anticipated usage volume without delays, providing insights into the real response times your users will face in production."
                  }
                </div>
                <div className="h-[280px] mx-auto mt-auto max-w-[480px] w-full rounded-[20px] border border-dashed border-[#388AEB] flex relative overflow-hidden">
                  <Image
                    src={"/assets/solution/performance/3.png"}
                    fill
                    alt="performance-3"
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

export default PerformancePage;
