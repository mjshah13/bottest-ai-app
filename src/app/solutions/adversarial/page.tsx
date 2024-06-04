"use client";
import Image from "next/image";
import React from "react";

const AdversarialPage = () => {
  return (
    <div>
      <div className="bg-home-hero-bg-m md:bg-home-hero-bg-d bg-no-repeat bg-cover rounded-[20px] px-7 md:px-14 lg:px-[100px] pt-20 pb-10 md:py-[120px] mb-3 md:mb-8 flex flex-col md:flex-row items-center">
        <div className="max-w-[530px] w-full mr-4 text-center md:text-left mb-7 md:mb-0">
          <h1 className="text-[40px] md:text-[52px] font-medium leading-[48px] md:leading-[60px] mb-3 text-[#212427]">
            Adversarial Testing
          </h1>
          <p className="text-base text-[#616A73] tracking-tight">
            Vulnerability detection is critical to the safety of your users as
            well as your organization. Exploits can cause your chatbot to
            disclose sensitive information to unauthorized individuals, or
            exhibit behaviors that cause severe reputational damage to your
            organization.
            <br />
            <br />
            bottest.ai provides pre-made Test Suites designed after{" "}
            <a href="https://arxiv.org/abs/2307.02483" target="_blank" className="text-[#388AEB] underline">
              cutting-edge LLM security research
            </a>{" "}
            to help test for vulnerabilities before you release to production.
          </p>
        </div>
        <div className="w-full">
          <Image
            src="/assets/solution/adversarial.svg"
            alt="adversarial"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="py-7 md:py-10 lg:py-20 px-6 md:px-12 lg:px-[100px] mb-3 md:mb-8 flex flex-col md:flex-row bg-[#F7F9FB] rounded-[20px]">
        <div className="flex-1 md:mr-10 flex flex-col mb-5 md:mb-0">
          <h1 className="mb-4 text-2xl md:text-[40px] md:leading-[46px] font-medium text-[#212427]">
            Competing Objective Attacks
          </h1>
          <p className="mb-3 md:mb-5 text-sm md:text-base text-[#616A73]">
            {
              "A competing objective attack refers to scenarios in which a model’s instructions and its defined safety goals conflict. Through the exploitation of a chatbot’s inclination to follow instructions, a user can override safety rules and jailbreak your chatbot in 4 main ways:"
            }
          </p>
          <div className="max-w-full h-[250px] md:h-full w-full rounded-[20px] flex items-center justify-center border border-[#D6E6F7] bg-[#FFFFFF33] md:mr-4 relative">
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
        </div>
        <div className="flex-1">
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px] mb-2 md:mb-4">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">1. </span>Prefix Injection
            </h3>
            <p className="text-xs text-[#616A73]">
              This is when a user will ask the model to start their response
              with an affirmative response. Due to the technical nature of how
              LLMs generate outputs, this will highly increase the chances of
              the chatbot following through with the request.
            </p>
          </div>
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px] mb-2 md:mb-4">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">2. </span>Test Repository
            </h3>
            <p className="text-xs text-[#616A73]">
              This is when a user provides detailed instructions to the chatbot
              to not refuse their request. For example, telling the chatbot is
              in development mode and should therefore answer everything.
            </p>
          </div>
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px] mb-2 md:mb-4">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">3. </span>Refusal Suppression
            </h3>
            <p className="text-xs text-[#616A73]">
              Track Test Run data to understand performance over time. Receive
              emailed reports highlighting changes key metrics.
            </p>
          </div>
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px]">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">4. </span>Role-play
            </h3>
            <p className="text-xs text-[#616A73]">
              This is when a user will provide detailed instructions for your
              chatbot to take on the role of a character that might follow every
              instruction and ignore all safety barriers.
            </p>
          </div>
        </div>
      </div>
      <div className="py-7 md:py-10 lg:py-20 px-6 md:px-12 lg:px-[100px] mb-3 md:mb-8 bg-[#F7F9FB] rounded-[20px]">
        <div className="flex flex-col md:flex-row mb-5">
          <div className="flex-1 mr-4">
            <div className="max-w-[510px]">
              <h1 className="mb-4 text-2xl md:text-[40px] md:leading-[46px] font-medium text-[#212427]">
                Mismatched Generalizations
              </h1>
              <p className="mb-3 md:mb-5 text-sm md:text-base text-[#616A73]">
                {
                  "A mismatched generalization attack refers to scenarios in which an attacker takes advantage of the limited domain in which safety training occurs. Through a model’s potential failure to generalize its safety barriers due to a limited safety training dataset, an attacker can jailbreak the model in 4 main ways:"
                }
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="max-w-full h-[250px] md:h-full w-full rounded-[20px] flex items-center justify-center border border-[#D6E6F7] bg-[#FFFFFF33] md:mr-4 relative">
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
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px]">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">1. </span>Prefix Injection
            </h3>
            <p className="text-xs text-[#616A73]">
              {
                "This is when an attacker encodes their input (for example in Base64), which might be understood by the larger underlying LLM, but will completely bypass the safety training."
              }
            </p>
          </div>
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px]">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">2. </span>Character
              Transformation
            </h3>
            <p className="text-xs text-[#616A73]">
              This is when an attacker will obfuscate their prompt by altering
              individual characters in ways that the underlying model may
              understand, but is not accounted for during safety
            </p>
          </div>
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px]">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">3. </span>Word Transformation
            </h3>
            <p className="text-xs text-[#616A73]">
              {
                "Similar to character transformation, this is when an attacker will obfuscate their prompt by altering specific sensitive words that might cause the model to trigger a safety response (for example splitting sensitive words into substrings or using Pig Latin)."
              }
            </p>
          </div>
          <div className="py-5 px-6 bg-[#FFFFFFB2] border border-[#D6E6F7] rounded-[20px]">
            <h3 className="font-medium text-lg mb-1 text-[#212427]">
              <span className="text-[#FF915B]">4. </span>Prompt Level
              Obfuscation
            </h3>
            <p className="text-xs text-[#616A73]">
              Also similar to the other obfuscation methods, this technique is
              when an attacker applies obfuscation on the entire prompt, such as
              translating to another language or having the LLM itself output an
              obfuscation that it would still understand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdversarialPage;
