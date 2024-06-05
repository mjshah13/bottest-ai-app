/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import { homeStepsData } from "../utils/common";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Lottie from "react-lottie";
import * as heroLottie from "./components/hero.json";
import * as heroLottie1 from "./components/hero1.json";
import { HomeFooter } from "./components/homeFooter";
import HomeHeader from "./components/homeHeader";
import Link from "next/link";
import TestRun from "./components/testRun";
import { filterOptions } from "../utils/common";
import _ from "lodash";
import "react-loading-skeleton/dist/skeleton.css";
import { RefreshCw } from "lucide-react";
import { Box, Grid } from "@radix-ui/themes";
import { filteredData } from "./stubbedData";
import CustomButton from "../Elements/button";
import CustomInput from "../Elements/input";

const HomePage = () => {
  const [step, setStep] = useState(1);
  const [lottieSrc, setLottieSrc] = useState(heroLottie1);

  useEffect(() => {
    setTimeout(() => {
      setLottieSrc(heroLottie);
    }, 4000);
  }, []);

  return (
    <div className="relative">
      <HomeHeader />
      <div className="max-w-[1440px] m-auto w-full px-3 md:px-8 pt-[72px] pb-3 lg:pt-[104px] md:pb-8">
        <div className="w-[100%]">
          <div>
            <section className="bg-home-hero-bg-m sm:bg-home-hero-bg-d mb-8 bg-cover rounded-[20px] bg-no-repeat sm:py-[176px] py-[80px] pb-10 pr-[17px] sm:pr-0 pl-[17px] sm:pl-[60px] lg:pl-[104px] flex flex-col sm:flex-row items-center">
              <div className="lg:mr-[95px] sm:mr-[50px] mr-0">
                <h1 className="px-[15px] sm:px-0 text-center sm:text-left text-[48px] sm:text-[50px] leading-[50px] lg:text-[72px] lg:leading-[72px] font-medium mb-3 text-[#212427]">
                  Test <span className="text-[#4596F5]">Smarter</span> Not
                  Harder
                </h1>
                <p className="px-[15px] sm:px-0 text-center sm:text-left text-base text-[#616A73] mb-7">
                  Automated testing to build quality, reliability, and safety
                  into your AI-based chatbot — with no code.
                </p>
                <div className="block sm:hidden max-w-[700px] w-full lottie-wrapper">
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: lottieSrc,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                    width={"100%"}
                    height={"100%"}
                    isStopped={false}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                  />
                </div>
                <div className="mt-[15px] sm:mt-0 max-w-full sm:max-w-[277px] w-full">
                  <Link
                    href={"/sign-up"}
                    className="mb-2.5 flex items-center justify-center rounded-xl w-full h-10 sm:h-14 text-white text-sm sm:text-base hover:shadow-lg duration-200"
                    style={{
                      background:
                        "linear-gradient(93.32deg, #4596F5 0%, #176FD6 101.05%)"
                    }}
                  >
                  
                    Sign Up - it's free
                  </Link>
                  <button className="rounded-xl w-full h-10 sm:h-14 flex items-center text-sm sm:text-base bg-white border border-[#388AEB] text-[#388AEB] justify-center group hover:shadow-lg duration-200">
                    Get the Chrome Extention
                    <ArrowUpRight
                      size={16}
                      className="ml-2 transform group-hover:-translate-y-1.5 group-hover:translate-x-1.5 -translate-y-0.5 translate-x-0.5 duration-300"
                    />
                  </button>
                </div>
              </div>
              <div className="hidden sm:block max-w-[700px] w-full lottie-wrapper">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: lottieSrc,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  width={"100%"}
                  height={"100%"}
                  isStopped={false}
                  isPaused={false}
                  isClickToPauseDisabled={true}
                />
              </div>
            </section>
            <section className="bg-[#F7F9FB] rounded-[20px] md:mb-8 mb-3 md:pt-[72px] pt-[60px] relative py-10">
              <h1 className="text-[28px] md:text-[40px] text-[#212427] mb-8 text-center lg:px-20 px-8 leading-9 font-medium">
                Effortless Testing at Your Fingertips
              </h1>
              <div className="bg-white border border-[#388AEB] border-opacity-20 rounded-lg mx-10">
                <div className="py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447]">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="font-semibold font-poppin text-xl">
                        Refund Support - Production
                      </h1>
                    </div>
                    <div className="gap-4 flex ">
                      <CustomButton
                        variant="outline"
                        color="gray"
                        disabled={false}
                      >
                        Create new test
                      </CustomButton>
                      <CustomButton
                        color="blue"
                        variant="solid"
                        svgIcon={<RefreshCw size={17} />}
                        isPrimary
                        disabled={false}
                      >
                        Run all tests
                      </CustomButton>
                    </div>
                  </div>
                  <div>
                    <p className="text-black gap-2 font-medium font-poppin dark:text-white">
                      {"Most recent Suite Run results: "}
                      <span className="text-danger">
                        2 Fail
                      </span>
                      {", "}
                      <span className="text-success">
                        1 Pass
                      </span>
                      {" and "}
                      <span className="text-[#E7C200]">
                        2 Mixed
                      </span>
                    </p>
                  </div>
                </div>
                <div className=" py-5 px-4 border-b-2 border-[#f0f0f0] dark:border-b dark:border-[#434447] ">
                  <Grid
                    columns={{ lg: "3fr 1fr", md: "3fr 1fr" }}
                    gap="3"
                    width="auto"
                  >
                    <Box>
                      <div className=" border-[#d9d9d9] border dark:border dark:border-[#434447] rounded-lg w-max  ">
                        {filterOptions &&
                          filterOptions?.map((item, i) => (
                            <button
                              key={item.key}
                              className={`px-3.5 lg:py-1.5  text-black dark:text-white font-light text-base font-poppin border-r  border-[#f0f0f0] dark:border-r dark:border-[#434447] ${i === 0 ? "rounded-l-lg" : ""
                                } ${i === filterOptions.length - 1
                                  ? "border-r-0"
                                  : ""
                                } ${item.status === "View all"
                                  ? "bg-[#f5f5f5] text-black dark:bg-[#2A2D30] dark:text-white "
                                  : ""
                                }`}
                            >
                              {item.label}
                            </button>
                          ))}
                      </div>
                    </Box>
                    <Box>
                      <CustomInput
                        size="2"
                        className={"dark:bg-transparent h-[38px] rounded-lg"}
                        type="text"
                        placeholder="Search for a test"
                      />
                    </Box>
                  </Grid>
                </div>

                <div
                  className="px-5 pt-6"
                  style={{
                    maxHeight: "1000px",
                    overflowY: "auto",
                  }}
                >
                  {filteredData?.map(
                    ({ recent_test_runs, ...item }: any) => (
                      <div className="mb-5" key={item.id}>
                        <TestRun
                          specificTest={item}
                          isDisabled={!item?.full_run_enabled}
                          lastTestRuns={recent_test_runs}
                          loading={false}
                          stubbed={true}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
            <section className="lg:py-[120px] lg:px-12 py-[60px] md:py-20 md:px-6 px-0 md:mb-8 mb-3">
              <h1 className="mb-5 sm:mb-6 lg:mb-10 text-center sm:text-left text-[28px] sm:text-3xl md:text-5xl lg:text-[52px] font-medium text-[#212427]">
                Powerful Automation in 3 Steps
              </h1>
              <div className="grid sm:grid-cols-3 sm:gap-4 gap-3">
                {homeStepsData.map((item, key) => (
                  <div
                    key={key}
                    className="border border-[#D6E6F7] rounded-[20px] p-6 flex flex-col"
                    style={{
                      background:
                        "linear-gradient(180deg, #F3F8FC 0%, #CBE3F8 100%)",
                    }}
                  >
                    <h4 className="mb-2 text-[18px] sm:text-xl md:text-[28px] font-medium">
                      {item.title}
                    </h4>
                    <p className="text-[#616A73] text-sm md:text-base mb-3 sm:mb-10 lg:mb-20">
                      {item.description}
                    </p>
                    <div className="relative pt-[70%] mt-auto">
                      <Image src={item.img} alt="" fill />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <div className="relative">
              <section
                className="rounded-[20px] sticky top-20 md:top-14 bg-[#F7F9FB] mb-8 py-[20px] lg:py-[100px] lg:px-12 px-2 md:px-8 flex flex-col md:flex-row"
                id="home-step-section"
              >
                <div className="relative hidden md:block">
                  <div className="flex flex-col justify-between relative z-10 h-full">
                    <span
                      // href="#complete"
                      onClick={() => setStep(1)}
                      className={`${step === 1
                        ? "text-[#4596F5] bg-[#F2F8FF] border-[#388AEB]"
                        : "bg-white border-[#D6E6F7] text-[#212427]"
                        } w-[200px] transition-all duration-300 cursor-pointer relative h-[170px] text-[13px] font-medium border border-dashed rounded-[20px] flex items-center justify-center`}
                      onMouseEnter={() => setStep(1)}
                    >
                      COMPLETE TESTING
                      {step === 1 && (
                        <span className="absolute w-10 h-0 border-b border-dashed border-[#388AEB] top-[50%] translate-y-[50%] -right-10" />
                      )}
                    </span>
                    <span
                      // href="#smart"
                      onClick={() => setStep(2)}
                      className={`${step === 2
                        ? "text-[#4596F5] bg-[#F2F8FF] border-[#388AEB]"
                        : "bg-white border-[#D6E6F7] text-[#212427]"
                        } w-[200px] transition-all duration-300 cursor-pointer relative h-[170px] text-[13px] font-medium border border-dashed rounded-[20px] flex items-center justify-center`}
                      onMouseEnter={() => setStep(2)}
                    >
                      SMART EVALUATION
                      {step === 2 && (
                        <span className="absolute w-10 h-0 border-b border-dashed border-[#388AEB] top-[50%] translate-y-[50%] -right-10" />
                      )}
                    </span>
                    <span
                      // href="#enterprise"
                      onClick={() => setStep(3)}
                      className={`${step === 3
                        ? "text-[#4596F5] bg-[#F2F8FF] border-[#388AEB]"
                        : "bg-white border-[#D6E6F7] text-[#212427]"
                        } w-[200px] transition-all duration-300 cursor-pointer relative h-[170px] text-[13px] font-medium border border-dashed rounded-[20px] flex items-center justify-center`}
                      onMouseEnter={() => setStep(3)}
                    >
                      ENTERPRISE READINESS
                      {step === 3 && (
                        <span className="absolute w-10 h-0 border-b border-dashed border-[#388AEB] top-[50%] translate-y-[50%] -right-10" />
                      )}
                    </span>
                  </div>
                  <div className="absolute z-0 top-0 bottom-0 w-0 border-l border-dashed border-[#D6E6F7] left-[50%] translate-x-[-50%]" />
                </div>
                {/* <div className="flex items-center space-x-[14px] md:hidden mb-5 justify-center">
            <span
              className={`w-2 h-2 rounded-full ${
                step === 1 ? "bg-[#388AEB]" : "bg-[#D6E6F7]"
              }`}
              onClick={() => setStep(1)}
            />
            <span
              className={`w-2 h-2 rounded-full ${
                step === 2 ? "bg-[#388AEB]" : "bg-[#D6E6F7]"
              }`}
              onClick={() => setStep(2)}
            />
            <span
              className={`w-2 h-2 rounded-full ${
                step === 3 ? "bg-[#388AEB]" : "bg-[#D6E6F7]"
              }`}
              onClick={() => setStep(3)}
            />
          </div> */}
                <div className="ml-0 md:ml-10 relative w-full overflow-hidden space-y-6 md:space-y-0">
                  <div
                    className={`${step === 1
                      ? "relative opacity-100 translate-y-0 md:translate-x-0 visible"
                      : "md:absolute relative top-auto md:top-0 opacity-100 md:opacity-0 visible md:invisible md:translate-x-[100%]"
                      } w-full transition-all duration-[600ms] border border-dashed border-[#388AEB] rounded-[20px] rounded-t-[20px] lg:p-10 p-6`}
                    style={{
                      background:
                        "linear-gradient(180deg, #F3F8FC 0%, #CBE3F8 100%)",
                    }}
                  >
                    <div className="bg-[#0076FF0D] -mt-6 -mx-6 h-10 flex items-center justify-center text-[11px] font-medium text-[#4596F5] md:hidden border-b mb-4 border-b-[#388AEB] rounded-t-[20px] border-dashed border-[#388AEB]">
                      COMPLETE TESTING
                    </div>
                    <h1 className="text-lg md:text-3xl lg:text-[40px] font-medium mb-3 md:mb-6 lg:mb-10 text-[#212427]">
                      Evaluate for functionality, performance, and security
                    </h1>
                    <div className="grid lg:grid-cols-2 gap-5">
                      <div className="">
                        <div className="flex items-center mb-1 md:mb-3 lg:mb-5 py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Auto generate cases to expand test coverage
                          </span>
                        </div>
                        <div className="flex items-center mb-1 md:mb-3 lg:mb-5 py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Run prepackaged chatbot-specific security tests
                          </span>
                        </div>
                        <div className="flex items-center py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Track performance over time with powerful analytics
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="relative pt-[50%] w-full">
                          <Image
                            src={"/assets/home/step1.svg"}
                            alt="step1"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${step === 2
                      ? "relative opacity-100 translate-y-0 md:translate-x-0 visible"
                      : "md:absolute relative top-auto md:top-0 opacity-100 md:opacity-0 visible md:invisible md:translate-x-[100%]"
                      } w-full transition-all duration-[600ms] border border-dashed border-[#388AEB] rounded-[20px] rounded-t-[20px] lg:p-10 p-6`}
                    style={{
                      background:
                        "linear-gradient(180deg, #F3F8FC 0%, #CBE3F8 100%)",
                    }}
                  >
                    <div className="bg-[#0076FF0D] -mt-6 -mx-6 h-10 flex items-center justify-center text-[11px] font-medium text-[#4596F5] md:hidden border-b mb-4 border-b-[#388AEB] rounded-t-[20px] border-dashed border-[#388AEB]">
                      SMART EVALUATION
                    </div>
                    <h1 className="text-lg md:text-3xl lg:text-[40px] font-medium mb-3 md:mb-6 lg:mb-10 text-[#212427]">
                      Capture what’s important <br />
                      in a conversation
                    </h1>
                    <div className="grid lg:grid-cols-2 gap-5">
                      <div className="">
                        <div className="flex items-center mb-1 md:mb-3 lg:mb-5 py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Record and replay complex UI interactions
                          </span>
                        </div>
                        <div className="flex items-center mb-1 md:mb-3 lg:mb-5 py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Customize success criteria for AI-powered
                            evaluations
                          </span>
                        </div>
                        <div className="flex items-center py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            View detailed analyses for any Test failures
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="relative pt-[50%] w-full">
                          <Image
                            src={"/assets/home/step2.svg"}
                            alt="step2"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${step === 3
                      ? "relative opacity-100 translate-y-0 md:translate-x-0 visible"
                      : "md:absolute relative top-auto md:top-0 opacity-100 md:opacity-0 visible md:invisible md:translate-x-[100%]"
                      } w-full transition-all duration-[600ms] border border-dashed border-[#388AEB] rounded-[20px] rounded-t-[20px] lg:p-10 p-6`}
                    style={{
                      background:
                        "linear-gradient(180deg, #F3F8FC 0%, #CBE3F8 100%)",
                    }}
                  >
                    <div className="bg-[#0076FF0D] -mt-6 -mx-6 h-10 flex items-center justify-center text-[11px] font-medium text-[#4596F5] md:hidden border-b mb-4 border-b-[#388AEB] rounded-t-[20px] border-dashed border-[#388AEB]">
                      ENTERPRISE READINESS
                    </div>
                    <h1 className="text-lg md:text-3xl lg:text-[40px] font-medium mb-3 md:mb-6 lg:mb-10 text-[#212427]">
                      Scale from a single individual to an entire organization
                    </h1>
                    <div className="grid lg:grid-cols-2 gap-5">
                      <div className="">
                        <div className="flex items-center mb-1 md:mb-3 lg:mb-5 py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Manage permissions across multiple projects
                          </span>
                        </div>
                        <div className="flex items-center mb-1 md:mb-3 lg:mb-5 py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Deploy in the cloud or on-premise
                          </span>
                        </div>
                        <div className="flex items-center py-5 md:py-0 md:h-[140px] px-3 md:px-6 bg-white rounded-[20px]">
                          <ArrowRight size={14} color="#388AEB" />
                          <span className="ml-3 md:ml-5 text-sm text-[#212427]">
                            Integrate with existing automated workflows
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="relative pt-[50%] w-full">
                          <Image
                            src={"/assets/home/step3.svg"}
                            alt="step3"
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* <div className="h-[1500px] md:h-[2000px]"></div> */}
            </div>
          </div>
        </div>
        <HomeFooter title="Getting started is easy" />
      </div>
    </div>
  );
};

export default HomePage;
