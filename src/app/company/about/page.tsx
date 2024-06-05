"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutUsPage = () => {
  return (
    <>
      <div className="bg-[#F7F9FB] rounded-[20px] py-[100px] md:py-[160px] px-5 md:px-12 text-center mb-3 md:mb-8">
        <h1 className="text-[40px] md:text-[52px] text-[#212427] font-medium max-w-[900px] m-auto w-full leading-[48px] md:leading-[60px] mb-5 md:mb-8">
          {"We’re passionate about testing, so you can stay passionate about "}
          <span className="text-[#388AEB]">your product.</span>
        </h1>
        <p className="text-base text-[#616A73] max-w-[970px] m-auto">
          {
            "We’re committed to making testing for your chatbot as easy as possible, so you can stay focused on what matters most: bringing your product to the next level."
          }
        </p>
      </div>
      <div className="learn-more-card bg-8 flex sm:flex-row flex-col items-center min-h-[600px] py-10 mb-3 md:mb-8 rounded-[20px]">
        <div className="w-full lg:px-[98px] md:px-14 px-8">
          <h1 className="text-[28px] md:text-[40px] font-medium text-[#212427] mb-3">
            Vision and Values
          </h1>
          <p className="text-[#616A73] text-base">
            {
              "At bottest.ai, our mission is to streamline the testing process of your AI-based chatbot. We provide a powerful, no-code solution that handles the complexities of QA (quality assurance) testing. "
            }
            <br />
            <br />
            Our product ensures you meet the highest standards of reliability,
            performance, and safety.
          </p>
        </div>
        <div className="sm:max-w-[590px] w-full px-8 sm:px-0 mt-7 sm:mt-0">
          <Image
            src="/Assets/company/about/1.svg"
            alt="about1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="learn-more-card bg-8 flex sm:flex-row flex-col items-center min-h-[600px] py-10 mb-3 md:mb-8 rounded-[20px]">
        <div className="sm:max-w-[590px] w-full px-8 sm:px-0 mt-7 sm:mt-0 order-2 sm:order-1">
          <Image
            src="/Assets/company/about/2.svg"
            alt="about1"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="w-full lg:px-[98px] md:px-14 px-8 order-1 sm:order-2">
          <h1 className="text-[28px] md:text-[40px] font-medium text-[#212427] mb-3">
            Company History
          </h1>
          <p className="text-[#616A73] text-base">
            bottest.ai was founded in 2023 in San Francisco, at the hub of AI
            innovation. Our inception was fueled by the challenges in numerous
            AI startups and large companies struggling with AI application
            development, particularly in chatbot testing.
            <br />
            <br />
            Recognizing the need for a streamlined, well built, no-code testing
            solution, we set out to bridge this gap in the AI technology
            landscape. If your team is looking for the right tool to elevate
            your chatbot product, contact us!
          </p>
          <div className="flex sm:flex-row flex-col mt-3 sm:mt-3.5">
            <Link
              href={"/pricing"}
              className="btn-gradient flex items-center justify-center sm:max-w-[200px] w-full h-[52px] rounded-xl text-white text-base hover:shadow-lg duration-200"
            >
              Pricing Options
            </Link>
            <Link
              href="/company/contact"
              className="bg-white border border-[#388AEB] flex items-center justify-center mt-3 sm:mt-0 sm:ml-3 sm:max-w-[200px] w-full h-[52px] rounded-xl text-[#212427] text-base hover:shadow-lg duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="learn-more-card bg-8 flex sm:flex-row flex-col items-center min-h-[600px] py-10 mb-3 md:mb-8 rounded-[20px]">
        <div className="w-full lg:px-[98px] md:px-14 px-8">
          <h1 className="text-[28px] md:text-[40px] font-medium text-[#212427] mb-3">
            Products & Services
          </h1>
          <p className="text-[#616A73] text-base">
            Our platform is designed with a direct focus on user experience to
            allow for quick and efficient setup. However, we also offer a wide
            range of powerful features to fully customize every aspect of the
            testing process to the fullest extent.
          </p>
          <Link
            href={"/pricing"}
            className="mt-3 flex items-center justify-center sm:mt-3.5 btn-gradient sm:max-w-[200px] w-full h-[52px] rounded-xl text-white text-base hover:shadow-lg duration-200"
          >
            Pricing Options
          </Link>
        </div>
        <div className="sm:max-w-[590px] w-full px-8 sm:px-0 mt-7 sm:mt-0">
          <Image
            src="/Assets/company/about/3.svg"
            alt="about3"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
