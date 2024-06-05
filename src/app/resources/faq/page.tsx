/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { faqTitles } from "../../../utils/common";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const FaqPage = () => {
  const [toggle, setToggle] = useState("");
  return (
    <div className="bg-[#F7F9FB] px-5 md:px-6 pt-20 md:pt-[100px] pb-5 md:pb-6 mb-3 md:mb-8 rounded-[20px]">
      <h1 className="text-center text-[40px] font-medium text-[#212427] md:text-[52px] mb-8">
        FAQ
      </h1>
      <div className="md:grid hidden grid-cols-3 gap-4 mb-24">
        {faqTitles.map((item, key) => (
          <Link
            href={`#${item.index}`}
            key={key}
            className="text-sm min-h-[88px] py-3 px-6 flex items-center border-[#388AEB80] border bg-white rounded-[20px] group hover:shadow-md duration-300"
          >
            <span className="mr-3">
              <ArrowRight color="#FF915B" size={20} className="transform group-hover:translate-x-0 -translate-x-2 duration-300" />
            </span>
            {item.title}
          </Link>
        ))}
      </div>
      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="what_is_chatbot_testing"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle((prev) =>
              prev === "what_is_chatbot_testing"
                ? ""
                : "what_is_chatbot_testing"
            )
          }
        >
          <span>What is chatbot testing?</span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle === "what_is_chatbot_testing"
            ? "max-h-[1000px] pb-4 md:pb-6"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {
              "Chatbot testing validates that an AI chatbot produces an expected output to a series of test prompts. The testing effort ensures that the chatbot delivers the promised user experience in a performant and secure manner. Generally, this is very difficult to do without automation, or can be extremely time consuming. For example, you might want to test that a customer-facing healthcare chatbot can accurately answer questions about how to alleviate symptoms from the common cold, but also will stay inline with its responsibilities and won’t try to diagnose your users with diseases. Testing is performed to:"
            }
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              Ensure that a chatbot generates relevant information that is
              correct and useful to the user.
            </li>
            <li>
              {
                "Verify that the chatbot’s performance is acceptable when a bot is initially released."
              }
            </li>
            <li>
              Validate that a new chatbot release is not providing sub-standard
              response times compared to performance baselines established in
              prior releases.
            </li>
            <li>
              Certify that the chatbot is secure and that the necessary
              guardrails are in place to prevent responses that contain harmful
              or confidential information.
            </li>
          </ul>
        </div>
      </div>
      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="how_do_i_test_a_chatbot"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle((prev) =>
              prev === "how_do_i_test_a_chatbot"
                ? ""
                : "how_do_i_test_a_chatbot"
            )
          }
        >
          <span>How do I test a chatbot?</span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle === "how_do_i_test_a_chatbot"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {
              "For effective chatbot testing, it is important to evaluate the chatbot using  well-designed test cases and a repeatable process. In order to achieve this goal:"
            }
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              Test cases must be thoughtfully defined and organized into test
              suite
            </li>
            <li>
              {
                "A testing baseline must be established for both expected functionality and chatbot performance. The bot response for each round of testing is evaluated against this established baseline."
              }
            </li>
            <li>
              The full suite of test cases must be executed after every change
              made to the chatbot to ensure that there is no negative impact on
              user experience.
            </li>
            <li>
              A separate chatbot test environment must be created and maintained
              so that full regression test cycles can be applied to the chatbot
              after a change without impacting end users.
            </li>
          </ul>
        </div>
      </div>
      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="what_are_the_best_practices_for_chatbot_testing"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle("what_are_the_best_practices_for_chatbot_testing")
          }
        >
          <span>What are the best practices for chatbot testing?</span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle === "what_are_the_best_practices_for_chatbot_testing"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {"A system that successfully tests AI chatbots must :"}
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              Ensure that a chatbot generates relevant information that is
              correct and useful to the user. This represents the functional
              testing component of chatbot validation. A test case is built for
              this type of testing for each expected class of user input.
            </li>
            <li>
              {
                "Verify that the chatbot’s performance is acceptable when a bot is initially released."
              }
            </li>
            <li>
              Validate that a new chatbot release is not providing sub-standard
              response times compared to performance baselines established in
              prior releases.
            </li>
            <li>
              Perform security testing to verify that the chatbot is secure and
              that the necessary guardrails are in place to prevent responses
              that contain harmful or confidential information.
            </li>
          </ul>
        </div>
      </div>
      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="how_should_chatbot_test_cases_be_defined"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle((prev) =>
              prev === "how_should_chatbot_test_cases_be_defined"
                ? ""
                : "how_should_chatbot_test_cases_be_defined"
            )
          }
        >
          <span>How should chatbot test cases be defined?</span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle === "how_should_chatbot_test_cases_be_defined"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {
              "AI Chatbot test cases require a different approach from traditional UI testing because the LLMs that are used to power these types of bots typically do not provide identical responses to a prompt within a chatbot conversation. In order to build effective chatbot test cases:"
            }
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              A large Language Model should be used to evaluate chatbot
              conversations to determine if responses to user questions are
              effectively equivalent to the baseline, even when there are small
              variances in the response.
            </li>
            <li>
              The testing system must allow for multiple baselines to be
              established to handle scenarios where there are multiple valid
              answers to a question.
            </li>
            <li>
              The system must provide a mechanism for a human reviewer to
              provide feedback to the error management system. For example, a
              user may want to flag a response that was initially evaluated to
              be an error and convert it into a valid test baseline.
            </li>
            <li>
              {
                "Each test case must support multiple variants since there are often many ways to form the same question using language. For example, a customer support system should provide essentially the same answers to the the questions “How do I use product X” and “I don’t understand how product X should be used”."
              }
            </li>
          </ul>
        </div>
      </div>
      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="why_is_automation_essential_to_software_testing_for_chatbots"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle(
              "why_is_automation_essential_to_software_testing_for_chatbots"
            )
          }
        >
          <span>
            Why is automation essential to software testing for chatbots?
          </span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle ===
            "why_is_automation_essential_to_software_testing_for_chatbots"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {
              "Optimization and security verification for any production-grade AI chatbot solution is essential. Streamlining this effort for a complex enterprise deployment without automation is impossible."
            }
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              Every small change in the chatbot prompting instructions requires
              a full regression test of all chatbot functionality and a
              re-validation of security guardrails. This continuous testing
              effort cannot be supported at scale with only manual testers.
            </li>
            <li>
              {
                "Conversational AI chatbots in the enterprise are typically only one component of an automation solution. For example, a virtual assistant deployed in an enterprise may rely on models based on in-house training data and leverage APIs to an internal e-commerce system or other machine learning models. When any changes occur to connected systems, a complete end-to-end regression is required to validate that the chatbot satisfies all critical use cases. This type of extensive testing is only possible through automation."
              }
            </li>
            <li>
              The requirement for supporting multiple baselines to evaluate the
              variable nature of chatbot responses correctly is difficult to
              handle without automation, as each tester must be familiarized
              with a broad spectrum of responses that are considered valid.
            </li>
            <li>
              Testing for security guardrail enforcement involves carefully
              crafted test cases based on knowledge of the vulnerabilities of
              state-of-the-art language models. These skills are beyond the
              scope of the testing services provided in most organizations.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="how_do_traditional_automation_testing_tools_fall_short_when_testing_ai_chatbots"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle(
              "how_do_traditional_automation_testing_tools_fall_short_when_testing_ai_chatbots"
            )
          }
        >
          <span>
            How do traditional automation testing tools fall short when testing
            AI chatbots?
          </span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle ===
            "how_do_traditional_automation_testing_tools_fall_short_when_testing_ai_chatbots"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {
              "Traditional automation testing tools or automation providers leverage a set oftechniques and technologies that fall short of the requirements for the testingof chatbots. These shortcomings include:"
            }
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              Selenium or similar technologies record and replay tests for
              automated test execution. While this approach works well for
              testing traditional user interfaces, it falls short when facing
              the varied formats of chatbot responses in a conversational flow.
            </li>
            <li>
              Each test scenario is defined based on input steps and a specific
              expected output. Since LLM-based chatbots produce variability in
              their responses, testing chatbots requires a valid semantic
              comparison of results against multiple acceptable benchmarks.
            </li>
            <li>
              Chatbot development necessitates a highly iterative process where
              LLM prompts are continuously modified until an optimal overall
              solution is achieved. Traditional testing automation tools are
              capable of supporting the extensive a/b testing that is required
              to streamline this effort.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="how_is_chatbot_testing_different_from_traditional_application_testing_or_traditional_automation_testing"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle(
              "how_is_chatbot_testing_different_from_traditional_application_testing_or_traditional_automation_testing"
            )
          }
        >
          <span>
            How is chatbot testing different from traditional application
            testing or traditional automation testing?
          </span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle ===
            "how_is_chatbot_testing_different_from_traditional_application_testing_or_traditional_automation_testing"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            AI chatbots, powered by ChatGPT or other natural language models,
            provide a user-friendly experience for users seeking information or
            initiating actions. However, they pose several unique testing
            challenges:
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              {
                "Unlike traditional applications where all logic is defined with explicit code, the conversational artificial intelligence used in chatbots uses NLP (natural language processing) instructions that are intrinsically vague (think of how you might try to measure conversational flow or conversational tone)."
              }
            </li>
            <li>
              Even small changes in the prompt for the LLM can cause dramatic
              changes in behavior. It is challenging to validate that a prompt
              change intended to solve a specific issue is not causing
              unintended problems with other responses.
            </li>
            <li>
              While traditional web UIs provide a finite set of possibilities
              for user interactions, AI chatbots are based on generative natural
              language processing and allow for infinite variations in
              conversation flow.
            </li>
            <li>
              Unlike traditional UI applications where user intent is clear
              based on the action performed in the UI, chatbots must correctly
              infer user intent from the conversation.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle(
              "what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process"
            )
          }
        >
          <span>
            What are the metrics that measure the success of the chatbot testing
            process?
          </span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle ===
            "what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            Three primary areas of testing should be covered in an effective
            chatbot test suite in addition to the standard developer-maintained
            validation unit tests that are executed as part of the DevOps
            deployment pipeline for the bot:
          </p>
          <p>Functionality Testing:</p>
          <ul className="pl-6 list-disc">
            <li>
              Verify the chatbot's ability to perform all intended actions to
              maintain the expected level of functionality and usability.
            </li>
            <li>
              Test for correct responses to various inputs, including the
              support of multi-pass conversational flow required for a good
              customer experience.
            </li>
            <li>
              Check the chatbot's handling of invalid or unexpected user inputs.
            </li>
          </ul>
          <p className="mt-4">Security Testing:</p>
          <ul className="pl-6 list-disc">
            <li>
              Evaluate adherence to critical data security and privacy
              standards.
            </li>
            <li>
              Test for vulnerabilities to hacking or unauthorized access
              initiated through responses to user queries.
            </li>
            <li>
              Verify the handling of sensitive user information to ensure
              compatibility with internal data governance standards.
            </li>
          </ul>
          <p className="mt-4">Performance Testing:</p>
          <ul className="pl-6 list-disc">
            <li>
              Evaluate the performance of the entire test suite compared to
              established SLAs and prior production performance benchmarks.
            </li>
            <li>
              Identify test cases that perform significantly slower than in
              prior chatbot versions.
            </li>
            <li>
              Perform load testing to ensure acceptable performance is sustained
              while the chatbot is under the expected levels of peak
              concurrency.
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border border-[#D6E6F7] rounded-[20px] bg-white text-[#212427] mb-6"
        id="what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process1"
      >
        <h1
          className="p-4 md:p-6 flex justify-between text-base md:text-2xl font-normal md:font-medium"
          onClick={() =>
            setToggle(
              "what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process1"
            )
          }
        >
          <span>
            What are the metrics that measure the success of the chatbot testing
            process?
          </span>
          <span>
            <ChevronDown
              size={24}
              color="#000000"
              className="ml-3 block md:hidden"
            />
          </span>
        </h1>
        <div
          className={`px-4 md:px-6 text-sm md:pb-6 md:text-base overflow-hidden transition-all duration-1000 ${toggle ===
            "what_are_the_metrics_that_measure_the_success_of_the_chatbot_testing_process1"
            ? "max-h-[1000px] h-fit pb-4"
            : "md:max-h-[1000px] max-h-0 pb-0"
            }`}
        >
          <p className="mb-4">
            {
              "Key metrics that should be measured in automated chatbot testing include:"
            }
          </p>
          <ul className="pl-6 list-disc space-y-4">
            <li>
              Success rate of individual test cases as measured through a
              semantic evaluation against all valid test baselines. The total
              number of failed test cases should also be reported.
            </li>
            <li>
              Overall test suite success rate compared to test suite results
              collected against the current production system.
            </li>
            <li>Response time distribution for cases in a test suite.</li>
            <li>
              Number and % of test cases whose response time falls below current
              production SLAs or a production performance baseline.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
