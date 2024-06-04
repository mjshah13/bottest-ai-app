"use client";
import Image from "next/image";
import React, { useState } from "react";

const HowitworksPage = () => {
  return (
    <div className="bg-product-howitworks-m mb-3 md:mb-8 bg-cover rounded-[20px] bg-no-repeat sm:bg-product-howitworks-d px-3 md:px-12 pb-3 md:pb-12">
      <div className="max-w-[868px] text-center m-auto pt-[200px] pb-[100px] md:pb-[200px]">
        <h1 className="text-[40px] text-[#212427] font-medium mb-3 md:leading-[60px] leading-[48px] md:text-[52px]">
          Start Testing Your Chatbot with{" "}
          <span className="text-[#176FD6]">No-Code Configuration</span>
        </h1>
        <p className="max-w-[596px] m-auto text-[#616A73] text-base">
          {
            "Here’s how we make it easy to ensure your chatbot answers the questions that matter, the way you want it to."
          }
        </p>
      </div>

      <div className="bg-white relative rounded-[20px] py-5 px-4 md:py-10 md:px-14 mb-8 flex lg:items-center lg:flex-row flex-col">
        <div className="static mb-3 w-fit lg:absolute top-8 left-8 border text-[13px] text-[#FF915B] border-dashed border-[#FF915B] rounded-xl bg-[#FF915B0D] h-10 px-6 flex items-center">
          STEP 1
        </div>
        <div className="flex-1">
          <div className="lg:mb-0 mb-8 lg:pr-6 max-w-[600px] lg:max-w-[450px] w-full">
            <h1 className="pb-3 text-[28px] font-medium text-[#212427] tracking-">
              You Record a Conversation
            </h1>
            <p className="text-sm text-[#616A73]">
              Using our chrome extension, you record a conversation with your
              chatbot.
              <br />
              <br />
              Any interactions you have with the webpage wil be included in the
              recording.
            </p>
          </div>
        </div>
        <div className="flex-1 howitwork-card overflow-hidden">
          <Image
            src={"/assets/products/how1.svg"}
            alt="how1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="bg-white relative rounded-[20px] py-5 px-4 md:py-10 md:px-14 mb-8 flex lg:items-center lg:flex-row flex-col">
        <div className="static mb-3 w-fit lg:absolute top-8 left-8 border text-[13px] text-[#FF915B] border-dashed border-[#FF915B] rounded-xl bg-[#FF915B0D] h-10 px-6 flex items-center">
          STEP 2
        </div>
        <div className="flex-1">
          <div className="lg:mb-0 mb-8 lg:pr-6 max-w-[600px] lg:max-w-[450px] w-full">
            <h1 className="pb-3 text-[28px] font-medium text-[#212427] tracking-">
              We Setup a Test
            </h1>
            <p className="text-sm text-[#616A73]">
              {
                "We automatically capture the questions you asked and the Bot’s answers to save within a Test. "
              }
              <br />
              <br />
              The questions will be re-asked at a later point, and the new
              answers will be compared against the answers given in the recorded
              conversation.
            </p>
          </div>
        </div>
        <div className="flex-1 howitwork-card overflow-hidden">
          <Image
            src={"/assets/products/how2.svg"}
            alt="how1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="bg-white relative rounded-[20px] py-5 px-4 md:py-10 md:px-14 mb-8 flex lg:items-center lg:flex-row flex-col">
        <div className="static mb-3 w-fit lg:absolute top-8 left-8 border text-[13px] text-[#FF915B] border-dashed border-[#FF915B] rounded-xl bg-[#FF915B0D] h-10 px-6 flex items-center">
          STEP 3
        </div>
        <div className="flex-1">
          <div className="lg:mb-0 mb-8 lg:pr-6 max-w-[600px] lg:max-w-[450px] w-full">
            <h1 className="pb-3 text-[28px] font-medium text-[#212427] tracking-">
              You Run the Test
            </h1>
            <p className="text-sm text-[#616A73]">
              You can then run your individual Test or an entire Suite of Tests
              from the extension or the browser.
              <br />
              <br />
              Configure Tests to run on a schedule or hook directly into your
              deployment pipeline.
            </p>
          </div>
        </div>
        <div className="flex-1 howitwork-card overflow-hidden">
          <Image
            src={"/assets/products/how3.svg"}
            alt="how1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="bg-white relative rounded-[20px] py-5 px-4 md:py-10 md:px-14 mb-8 flex lg:items-center lg:flex-row flex-col">
        <div className="static mb-3 w-fit lg:absolute top-8 left-8 border text-[13px] text-[#FF915B] border-dashed border-[#FF915B] rounded-xl bg-[#FF915B0D] h-10 px-6 flex items-center">
          STEP 4
        </div>
        <div className="flex-1">
          <div className="lg:mb-0 mb-8 lg:pr-6 max-w-[600px] lg:max-w-[450px] w-full">
            <h1 className="pb-3 text-[28px] font-medium text-[#212427] tracking-">
              We Evaluate the Response
            </h1>
            <p className="text-sm text-[#616A73]">
              We replay the conversation, and capture the new responses from the
              chatbot.
              <br />
              <br />
              {
                "An LLM (Large Language Model) is used to evaluate the responses against the established Test Baseline(s) to see if a given test Passes or Fails."
              }
            </p>
          </div>
        </div>
        <div className="flex-1 howitwork-card overflow-hidden">
          <Image
            src={"/assets/products/how4.svg"}
            alt="how1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="bg-white relative rounded-[20px] py-5 px-5 md:py-10 md:px-14 flex lg:items-center lg:flex-row flex-col">
        <div className="static mb-3 w-fit lg:absolute top-8 left-8 border text-[13px] text-[#FF915B] border-dashed border-[#FF915B] rounded-xl bg-[#FF915B0D] h-10 px-6 flex items-center">
          STEP 5
        </div>
        <div className="flex-1">
          <div className="lg:mb-0 mb-8 lg:pr-6 max-w-[600px] lg:max-w-[450px] w-full">
            <h1 className="pb-3 text-[28px] font-medium text-[#212427] tracking-">
              You Learn from Analytics
            </h1>
            <p className="text-sm text-[#616A73]">
              When results don’t match the Baseline, gain insight into exactly
              where and why.
              <br />
              <br />
              Track chatbot response time performance and functionality across
              historical Test Runs, to learn how your chatbot is trending over
              time.
            </p>
          </div>
        </div>
        <div className="flex-1 howitwork-card overflow-hidden">
          <Image
            src={"/assets/products/how5.svg"}
            alt="how1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HowitworksPage;
