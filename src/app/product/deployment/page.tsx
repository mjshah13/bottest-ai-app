"use client";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const DeploymentPage = () => {
  return (
    <div>
      <div className="bg-[#F7F9FB] py-[100px] md:py-[120px] rounded-[20px] md:px-12 px-5 text-center mb-3 md:mb-8">
        <h1 className="mb-5 text-[40px] lg:text-[52px] font-medium text-[#212427]">
          Cloud vs On-Premises Deployment
        </h1>
        <p className="max-w-[920px] w-full m-auto text-[#616A73] text-base">
          {
            "Compare the different deployment options for bottest.ai and find a solution that’s best for your business. We offer migration services to help transfer testing data if you decide to change your deployment method."
          }
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-8 mb-3">
        <div className="py-12 px-7 lg:px-14 learn-more-card rounded-[20px] border border-[#D6E6F7] flex flex-col">
          <h1 className="mb-3 font-medium text-[28px] text-[#212427]">
            Cloud Deployment
          </h1>
          <p className="mb-7 text-[#616A73] text-sm md:text-base tracking-tight">
            Behind the scenes on how your testing is managed and deployed, from
            evaluation to analytics to deployment—and everything in between.
          </p>
          <div className="grid gap-4 pb-10">
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Turnkey solution - no IT support required
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                No LLM API keys needed
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Start testing in minutes
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Automatic backups
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Automatic upgrades to the latest release
              </span>
            </div>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={"/sign-up"}
              className="btn-gradient h-12 flex items-center justify-center sm:h-14 rounded-xl text-white text-base hover:shadow-lg duration-200"
            >
              Sign Up for Free
            </Link>
            <Link
              href={"/company/contact"}
              className="bg-white flex items-center justify-center h-12 sm:h-14 text-[#388AEB] border border-[#388AEB] rounded-xl hover:shadow-lg duration-200"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="py-12 px-7 lg:px-14 learn-more-card rounded-[20px] border border-[#D6E6F7] flex flex-col">
          <h1 className="mb-3 font-medium text-[28px] text-[#212427]">
            On-Premises Deployment
          </h1>
          <p className="mb-7 text-[#616A73] text-sm md:text-base tracking-tight">
            A fully customizable air-gapped implementation that can be deployed
            in your VPC and on your network. Keep all data fully within your
            control from start to finish and in your control.
          </p>
          <div className="grid gap-4 pb-10">
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Deploy in your datacenter or private cloud
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Docker-based implementation
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                All testing data stored within your network
              </span>
            </div>
            <div className="w-full py-3 md:py-3.5 bg-white rounded-xl px-6 flex items-center">
              <span>
                <CircleCheck size={20} color="#FF915B" />
              </span>
              <span className="text-sm md:text-base ml-3 text-[#212427]">
                Air gapped solution with on-premise LLM
              </span>
            </div>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={"/sign-up"}
              className="flex items-center justify-center btn-gradient h-12 sm:h-14 rounded-xl text-white text-base hover:shadow-lg duration-200"
            >
              Sign Up for Free
            </Link>
            <Link
              href={"/company/contact"}
              className="flex items-center justify-center bg-white h-12 sm:h-14 text-[#388AEB] border border-[#388AEB] rounded-xl hover:shadow-lg duration-200"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentPage;
