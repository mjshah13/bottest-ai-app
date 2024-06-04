"use client";
import {
  AppWindow,
  BookText,
  Bot,
  Headset,
  Layers,
  MessageCircleQuestion,
  Rocket,
  SearchCheck,
  ShieldCheck,
  SquareActivity,
} from "lucide-react";
import React, { useState } from "react";

const KeyConceptsPage = () => {
  const [selectedTab, setSelectedTab] = useState("bot");
  return (
    <div>
      <div className="bg-[#F7F9FB] rounded-[20px] pt-[100px] md:pt-[160px] pb-8 px-5 md:px-12 mb-0 md:mb-8">
        <h1 className="mb-10 md:mb-[100px] text-[40px] lg:text-[52px] font-medium text-[#212427]">
          Understanding the{" "}
          <span className="text-[#176FD6]">bottest.ai Ecosystem</span>
        </h1>
        <div>
          <div className="flex-wrap md:flex-nowrap flex gap-2 lg:gap-3 pb-5">
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "bot"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("bot")}
            >
              <Bot size={20} />
              <span className="ml-1">BOT</span>
              {selectedTab === "bot" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "suite"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("suite")}
            >
              <Layers size={20} />
              <span className="ml-1">SUITE</span>
              {selectedTab === "suite" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "environment"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("environment")}
            >
              <AppWindow size={20} />
              <span className="ml-1">ENVIRONMENT</span>
              {selectedTab === "environment" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "test"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("test")}
            >
              <ShieldCheck size={20} />
              <span className="ml-1">TEST</span>
              {selectedTab === "test" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "varient"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("varient")}
            >
              <MessageCircleQuestion size={20} />
              <span className="ml-1">VARIANT</span>
              {selectedTab === "varient" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "baseline"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("baseline")}
            >
              <SquareActivity size={20} />
              <span className="ml-1">BASELINE</span>
              {selectedTab === "baseline" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
            <div
              className={`hover:cursor-pointer px-2 relative rounded-xl transition-all duration-300 w-fit md:w-full md:flex-1 text-[13px] border border-dashed h-9 md:h-10 flex items-center justify-center ${
                selectedTab === "evaluation"
                  ? "border-[#388AEB] bg-[#0076FF1A] text-[#388AEB]"
                  : "border-[#D6E6F7] bg-white text-[#212427]"
              }`}
              onClick={() => setSelectedTab("evaluation")}
            >
              <SearchCheck size={20} />
              <span className="ml-1">EVALUATION</span>
              {selectedTab === "evaluation" && (
                <span className="absolute h-5 -bottom-5 left-[50%] border-r border-dashed border-[#388AEB] hidden md:block" />
              )}
            </div>
          </div>
          <div className="relative overflow-hidden flex min-h-[563px] sm:min-h-[400px] md:min-h-auto">
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "bot"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <Bot size={20} />
                <span className="text-[13px] ml-1 font-medium">BOT</span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is a Bot?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  {
                    "A Bot is the chatbot product you center your testing repository around. You can share Bots with team members, either as viewers (who can inspect and run tests), or as editors (who can create, configure, and delete tests)."
                  }
                  <br />
                  <br />
                  {
                    "Most organizations will have just one chatbot product they need to test, but those who need more can easily set up and configure them for their organization using our Enterprise Plan."
                  }
                </p>
              </div>
              <Bot
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "suite"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <Layers size={20} />
                <span className="text-[13px] ml-1 font-medium">SUITE</span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is a Suite?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  A Suite is a way to group and organize recorded Tests that are
                  similar in what they are testing, like a folder in a
                  filesystem. Full Suites can be run with a single click in both
                  the Chrome Extension and the main application.
                  <br />
                  <br />
                  If you had a cooking chatbot, you might create a Suite for all
                  recipe-based questions, a Suite for all cooking utensil
                  questions, and a Suite for cooking best practices questions.
                </p>
              </div>
              <Layers
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "environment"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <AppWindow size={20} />
                <span className="text-[13px] ml-1 font-medium">
                  ENVIRONMENT
                </span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is an Environment?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  {
                    "An Environment is a way to organize testing of a Bot across multiple development environments (such as Development, Staging, Production, etc). "
                  }
                  <br />
                  <br />
                  {
                    "Environments are defined by the URL of the chatbot website, and it is a requirement that the HTML layout between environments is the same."
                  }
                </p>
              </div>
              <AppWindow
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "test"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <ShieldCheck size={20} />
                <span className="text-[13px] ml-1 font-medium">TEST</span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is a Test?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  A Test is a single specific scenario you want your chatbot to
                  be able to handle correctly. A Test can be thought of as the
                  semantic meaning behind a request or series of prompts. A Test
                  is not a sequence of specific prompts, since there are
                  practically unlimited ways to say the same thing!
                  <br />
                  <br />
                  For example, a single Test might be asking your chatbot how to
                  make lasagna, and then having follow-up questions regarding
                  the ingredients and specific instructions. There are many ways
                  to ask each of those questions, but all of those possible
                  variations of questions would fit under a single Test.
                </p>
              </div>
              <ShieldCheck
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "varient"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <MessageCircleQuestion size={20} />
                <span className="text-[13px] ml-1 font-medium">VARIANT</span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is a Variant?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  A Variant is a single set of specific questions asked by a
                  user in a conversation. There are many slightly different ways
                  a user can ask the same question, and it’s important to make
                  sure your chatbot is prepared to handle them all.
                  <br />
                  <br />
                  For example, while the following prompts might mean the same
                  thing, responses from the chatbot could vary drastically:
                  <ul className="list-disc pl-6">
                    <li>How do I make lasagna?</li>
                    <li>What is the recipe for lasagna?</li>
                    <li>Can you tell me how to make lasagna?</li>
                  </ul>
                  <br />
                  <br />
                  You can configure the number of variants to check for in the
                  testing process for a single Test, or an entire Suite.
                </p>
              </div>
              <MessageCircleQuestion
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "baseline"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <SquareActivity size={20} />
                <span className="text-[13px] ml-1 font-medium">BASELINE</span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is a Baseline?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  A Baseline is a valid/optimal set of responses given by the
                  chatbot in a conversation. During the testing process, each
                  response from the chatbot will be compared to the
                  corresponding response from the Baseline.
                  <br />
                  <br />
                  You can setup more than one Baselines for a single Test if
                  there are multiple distinct but correct ways for a chatbot to
                  respond during a Test.
                  <br />
                  <br />
                  {
                    "For example, when asking about gluten free alternatives to flour, both almond and buckwheat flour are correct but different answers. Since follow-up questions (such as asking for recipes using those ingredients) will take the user down distinct conversation paths, you might decide to have two Baseline set of responses to compare future conversations against."
                  }
                </p>
              </div>
              <SquareActivity
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
            <div
              className={`flex flex-col md:flex-row items-center overflow-hidden border border-[#388AEB] md:pt-10 md:pb-10 w-full border-dashed transition-all duration-500 rounded-[20px] bg-white md:min-h-[400px] ${
                selectedTab === "evaluation"
                  ? "relative opacity-100 visible top-0"
                  : "absolute opacity-0 invisible top-[400px]"
              }`}
            >
              <div className="md:hidden flex items-center text-[#176FD6] justify-center h-10 bg-[#0076FF0D] border-b border-dashed border-[#388AEB] w-full">
                <SearchCheck size={20} />
                <span className="text-[13px] ml-1 font-medium">EVALUATION</span>
              </div>
              <div className="px-6 pt-6 md:pt-0 pb-3 md:pb-0 md:pl-10 md:pr-[200px] flex flex-col justify-center">
                <h1 className="text-lg md:text-[28px] mb-3 font-medium text-[#212427]">
                  What is an Evaluation?
                </h1>
                <p className="text-[#616A73] text-sm md:text-base">
                  An Evaluation is a single determination by the bottest.ai Test
                  Evaluator whether a specific, unique conversation matches the
                  content at least one Baseline in the Test.
                  <br />
                  <br />
                  The number of Evaluations that will run for a specific Test
                  <ul className="list-decimal	pl-6">
                    <li>
                      depends on two factors: The number of Variants in the Test
                    </li>
                    <li>
                      {
                        "The number of iterations defined in the Test (the number of times each Variant will be ran)"
                      }
                    </li>
                  </ul>
                  <br />
                  <br />
                  {
                    "If you had 1 Test with 3 Variants and set the iteration count to 2, when running the Test you would get the 6 Evaluations. Note that if the temperature of your model is 0 (or close to 0), setting the iteration count above 1 is most likely unnecessary. "
                  }
                </p>
              </div>
              <SearchCheck
                className="absolute w-[150px] md:w-[300px] h-[150px] md:h-[300px] bottom-[-55px] md:bottom-auto left-[50%] md:left-auto translate-x-[-50%] md:translate-x-0 md:-right-[150px] opacity-10"
                color="#388AEB"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 md:py-[100px] md:px-12 text-center md:text-left">
        <h1 className="text-[28px] md:text-[40px] text-[#212427] font-medium mb-3 md:mb-5">
          Want to learn more?
        </h1>
        <p className="text-[#616A73] text-sm md:text-base">
          Explore your testing capabilities firsthand with a{" "}
          <b>quickstart guide</b>, do a deep dive using our <b>documentation</b>
          , or request a <b>personal demo</b>
          {" if you’re thinking of going enterprise."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:mt-10 mt-3 text-left">
          <div className="learn-more-card p-6 rounded-[20px]">
            <div className="w-[60px] h-[60px] rounded-xl bg-white flex items-center justify-center mb-5">
              <Rocket color="#FF915B" size={24} />
            </div>
            <p className="font-medium text-lg mb-5 text-[#212427]">
              Start your testing now with the Quickstart Guide
            </p>
            <button className="btn-gradient h-12 sm:h-14 w-full max-w-full sm:max-w-[250px] rounded-xl text-sm lg:text-base text-white">
              Start testing now
            </button>
          </div>
          <div className="learn-more-card p-6 rounded-[20px]">
            <div className="w-[60px] h-[60px] rounded-xl bg-white flex items-center justify-center mb-5">
              <BookText color="#FF915B" size={24} />
            </div>
            <p className="font-medium text-lg mb-5 text-[#212427]">
              Start your testing now with the Quickstart Guide
            </p>
            <button className="btn-gradient h-12 sm:h-14 w-full max-w-full sm:max-w-[250px] rounded-xl text-sm lg:text-base text-white">
              Check documentation
            </button>
          </div>
          <div className="learn-more-card p-6 rounded-[20px]">
            <div className="w-[60px] h-[60px] rounded-xl bg-white flex items-center justify-center mb-5">
              <Headset color="#FF915B" size={24} />
            </div>
            <p className="font-medium text-lg mb-5 text-[#212427]">
              Start your testing now with the Quickstart Guide
            </p>
            <button className="btn-gradient h-12 sm:h-14 w-full max-w-full sm:max-w-[250px] rounded-xl text-sm lg:text-base text-white">
              Schedule a call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyConceptsPage;
