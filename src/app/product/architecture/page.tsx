/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { architectureHeroData } from "../../../utils/common";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ArchitectPage = () => {
  return (
    <div>
      <div className="lg:bg-home-hero-bg-d bg-product-howitworks-m bg-cover bg-no-repeat rounded-[20px] lg:pt-6 pt-[120px] pb-5 md:pb-12 px-5 md:px-[80px] lg:px-[106px] mb-8">
        <div className="flex items-center justify-between pb-[60px] md:pb-6 flex-col lg:flex-row">
          <div className="lg:max-w-[553px] w-full">
            <h1 className="text-[40px] md:text-[52px] text-center lg:text-left font-medium mb-3 leading-[48px] md:leading-[60px] mt-0 lg:mt-[60px]">
              Test with <br />
              <span className="text-[#176FD6]">
                Confidence
                <br /> and Convenience
              </span>
            </h1>
            <p className="text-base text-[#616A73] text-center lg:text-left">
              Behind the scenes on how your testing is managed, from evaluation
              to analytics to deployment—and everything in between.
            </p>
          </div>
          <div className="w-full lg:ml-[100px] lg:mt-0 mt-5">
            <Image
              src="/assets/products/architects.svg"
              alt=""
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {architectureHeroData?.map((item, key) => (
            <a href={item?.link} key={key}>
              <div
                className="rounded-[20px] bg-[#FFFFFFB2] border border-[#388AEB80] px-6 py-5 group hover:shadow-lg duration-300"
                
              >
                <h1 className="flex items-center text-lg font-medium text-[#212427]">
                  <ArrowRight color="#FF915B" size={20} className="transform group-hover:translate-x-1 duration-300" />
                  <span className="ml-3">{item?.title}</span>
                </h1>
                <p className="mt-1 text-xs text-[#616A73]">
                  {item?.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div
        className="mb-8 flex flex-col lg:flex-row items-center justify-between p-8 lg:pl-[104px] lg:pr-8 lg:py-20 rounded-[20px] bg-[#F7F9FB]"
        id="chrome-extension"
      >
        <div className="lg:max-w-[580px] w-full lg:mr-20 ">
          <h1 className="text-[#212427] text-[28px] md:text-[40px] leading-[46px] mb-[18px]">
            Chrome Extension
          </h1>
          <p className="text-sm md:text-base text-[#616A73] mb-[18px]">
            The bottest.ai Google Chrome extension records each Test in the
            browser. Smart recording technology tracks complex UI interactions
            you perform for replaying purposes during evaluation.
            <br />
            <br />
            Test Runs can be executed directly from the Chrome Extension, where
            they will run in the browser. Watch the replayed conversations live,
            or minimize the tab and let the Tests run in the background.
          </p>
          <button className="btn-gradient rounded-xl h-14 w-full max-w-[320px] text-base text-white hidden lg:block hover:shadow-lg duration-200">
            Get the Chrome Extension
          </button>
        </div>
        <div className="lg:max-w-[580px] w-full mt-4 lg:mt-0">
          <Image
            src="/assets/products/arch1.svg"
            alt="arch1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <button className="btn-gradient rounded-xl h-14 w-full max-w-[320px] text-base text-white block lg:hidden mt-4">
          Get the Chrome Extension
        </button>
      </div>
      <div
        className="mb-8 flex flex-col lg:flex-row items-center justify-between p-8 lg:pl-[104px] lg:pr-8 lg:py-20 rounded-[20px] bg-[#F7F9FB]"
        id="test-repository"
      >
        <div className="lg:max-w-[580px] w-full lg:mr-20">
          <h1 className="text-[#212427] text-[28px] md:text-[40px] leading-[46px] mb-[18px]">
            Test Repository
          </h1>
          <p className="text-sm md:text-base text-[#616A73] mb-[18px]">
            The bottest.ai Test Repository holds all recorded Tests, Baselines,
            and the Evaluation results for each test run. Manage a variety of
            Suites across multiple environments all from a central, organized
            workspace.
            <br />
            <br />
            {
              "Have detailed control over each Test’s configuration, and customize how Evaluations are performed to check for the details that matter specifically to your product."
            }
          </p>
        </div>
        <div className="lg:max-w-[580px] w-full mt-4 lg:mt-0">
          <Image
            src="/assets/products/arch2.svg"
            alt="arch2"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div
        className="mb-8 flex flex-col lg:flex-row items-center justify-between p-8 lg:pl-[104px] lg:pr-8 lg:py-20 rounded-[20px] bg-[#F7F9FB]"
        id="analytics-platform"
      >
        <div className="lg:max-w-[580px] w-full lg:mr-20">
          <h1 className="text-[#212427] text-[28px] md:text-[40px] leading-[46px] mb-[18px]">
            Analytics Platform
          </h1>
          <p className="text-sm md:text-base text-[#616A73] mb-[18px]">
            The bottest.ai Analytics Platform stores key metrics on each
            Evaluation to track consistency, performance, and effectiveness of
            your chatbot over time. Use the Analytics Dashboard to compare
            specific Test Runs, environments, or Suites in real-time.
            <br />
            <br />
            Receive automated comprehensive reports after each full Test Run
            that highlights important areas to note, so you can quickly gain
            insight into the changes that matter in your chatbot.
          </p>
        </div>
        <div className="lg:max-w-[580px] w-full mt-4 lg:mt-0">
          <Image
            src="/assets/products/arch3.svg"
            alt="arch3"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div
        className="mb-8 flex flex-col lg:flex-row items-center justify-between p-8 lg:pl-[104px] lg:pr-8 lg:py-20 rounded-[20px] bg-[#F7F9FB]"
        id="test-evaluator"
      >
        <div className="lg:max-w-[580px] w-full lg:mr-20">
          <h1 className="text-[#212427] text-[28px] md:text-[40px] leading-[46px] mb-[18px]">
            Test Evaluator
          </h1>
          <p className="text-sm md:text-base text-[#616A73] mb-[18px]">
            {
              "The bottest.ai Test Evaluator uses a Large Language Model to determine discrepancies in both the content and tone of the chatbot’s response compared to established Baselines. "
            }
            <br />
            <br />
            {
              "Detailed and specific reasons are provided for each Evaluation that fails, for complete transparency on both how and why your chatbot isn’t performing as expected."
            }
          </p>
        </div>
        <div className="lg:max-w-[580px] w-full mt-4 lg:mt-0">
          <Image
            src="/assets/products/arch4.svg"
            alt="arch4"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div
        className="mb-8 flex flex-col lg:flex-row items-center justify-between p-8 lg:pl-[104px] lg:pr-8 lg:py-20 rounded-[20px] bg-[#F7F9FB]"
        id="bottestai-database"
      >
        <div className="lg:max-w-[580px] w-full lg:mr-20">
          <h1 className="text-[#212427] text-[28px] md:text-[40px] leading-[46px] mb-[18px]">
            bottest.ai Database
          </h1>
          <p className="text-sm md:text-base text-[#616A73] mb-[18px]">
            The bottest.ai Database is built to store all of your Tests
            securely, with privacy and reliability, following SOC2 compliance
            requirements.
            <br />
            <br />
            Take comfort in deploying your Tests to the bottest.ai cloud, or
            visit our page on the on-premise deployment options available.
          </p>
          <Link href="/product/deployment">
            <button className="btn-gradient rounded-xl h-14 w-full max-w-[320px] text-base text-white hidden lg:block hover:shadow-lg duration-300">
              See Deployment Options
            </button>
          </Link>
        </div>
        <div className="lg:max-w-[580px] w-full mt-4 lg:mt-0">
          <Image
            src="/assets/products/arch5.svg"
            alt="arch5"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Link href="/product/deployment">
          <button className="btn-gradient rounded-xl h-14 w-full max-w-[320px] text-base text-white block lg:hidden mt-4 hover:shadow-lg duration-200">
            See Deployment Options
          </button>
        </Link>
      </div>
      <div
        className="mb-8 flex flex-col lg:flex-row items-center justify-between p-8 lg:pl-[104px] lg:pr-8 lg:py-20 rounded-[20px] bg-[#F7F9FB]"
        id="execution-engine"
      >
        <div className="lg:max-w-[580px] w-full lg:mr-20">
          <h1 className="text-[#212427] text-[28px] md:text-[40px] leading-[46px] mb-[18px]">
            Execution Engine
          </h1>
          <p className="text-sm md:text-base text-[#616A73] mb-[18px]">
            {
              "The bottest.ai Execution Engine automates the running of Tests from the cloud—without the user’s browser. Executions run in parallel, greatly reducing the time required to perform large scale tests."
            }
            <br />
            <br />
            Configure Tests to run automatically on a time interval, or use our
            webhook APIs to hook directly into existing CI/CD pipelines.
          </p>
          <button className="btn-gradient rounded-xl h-14 w-full max-w-[320px] text-base text-white hidden lg:block hover:shadow-lg duration-200">
            Webhook Documentation
          </button>
        </div>
        <div className="lg:max-w-[580px] w-full mt-4 lg:mt-0">
          <Image
            src="/assets/products/arch6.svg"
            alt="arch6"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <button className="btn-gradient rounded-xl h-14 w-full max-w-[320px] text-base text-white block lg:hidden mt-4">
          Webhook Documentation
        </button>
      </div>
    </div>
  );
};

export default ArchitectPage;
