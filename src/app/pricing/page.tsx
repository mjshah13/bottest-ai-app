"use client";
import React, { useState } from "react";
import {
  pricingData,
  pricingTable,
} from "../../utils/common";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  CircleX,
} from "lucide-react";

const PricingPage = () => {
  const [tab, setTab] = useState(false);

  return (
    <div className="bg-[#F7F9FB] rounded-[20px] md:pt-[160px] pt-20 pb-5 md:pb-24 px-5 md:px-12 flex flex-col items-center mb-8">
      <div className="text-center mb-5 md:mb-[34px]">
        <h1 className="mb-3 text-[#212427] text-[40px] md:text-[52px] leading-[48px] md:leading-[60px] font-medium">
          Choose the plan that works for you
        </h1>
        <p className="mb-5 md:mb-[34px] text-[#616A73] md:text-base text-sm">
          From solo to enterprise, we have a plan that fits your needs.
        </p>
        <div className="flex items-center justify-center">
          <div
            className={`${tab
              ? "bg-white border-[#D6E6F7] text-[#212427]"
              : "bg-[#0076FF1A] border-[#388AEB] text-[#176FD6]"
              } mr-2 flex justify-center rounded-xl border border-dashed cursor-pointer items-center w-full max-w-[150px] md:max-w-[200px] h-10 transition-all duration-300 uppercase text-[13px] font-medium`}
            onClick={() => setTab(false)}
          >
            Monthly
          </div>
          <div
            className={`${!tab
              ? "bg-white border-[#D6E6F7] text-[#212427]"
              : "bg-[#0076FF1A] border-[#388AEB] text-[#176FD6]"
              } mr-2 flex justify-center rounded-xl border border-dashed cursor-pointer items-center w-full max-w-[150px] md:max-w-[200px] h-10 transition-all duration-300 uppercase text-[13px] font-medium`}
            onClick={() => setTab(true)}
          >
            Yearly{" "}
            <span className="bg-[#FF915B] rounded-full px-2 text-white ml-1 md:ml-3 text-[11px] md:text-[13px]">
              Save 20%
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {pricingData.map((item, key) => (
          <div
            className={`${key === 0 ? "bg-transparent" : "bg-pricing-card"
              } border border-[#D6E6F7] rounded-[20px] p-4 md:p-6 flex flex-col`}
            key={key}
          >
            <h2 className="text-2xl font-medium">{item.title}</h2>
            <p className="text-xs text-[#616A73] mb-5">
              {item.description}
            </p>
            <div className="mt-auto">
              {item.benefits.map((bItem, bKey) => (
                <p
                  key={bKey}
                  className="bg-white py-1 mb-2 px-2 rounded-xl flex items-center text-sm text-[#212427]"
                >
                  <span>
                    <CircleCheck
                      color="#FF915B"
                      size={20}
                      className="mr-2"
                    />
                  </span>
                  <span>
                    {key === 3 && (
                      <span className="text-[#388AEB] mr-1">Unlimited</span>
                    )}
                    {bItem}
                  </span>
                </p>
              ))}
            </div>
            <h1
              className={`mt-3 font-medium leading-[46px] text-[#212427] ${key === 3 ? "text-[28px]" : "text-[40px]"
                }`}
            >
              {key !== 3 && "$"}
              {key !== 3 &&
                (tab ? Number(item.price) * 12 * 0.8 : item.price)}
              {key === 3 && item.price}
              {key !== 3 && (
                <span className="text-[#616A73] text-sm font-normal">
                  /{tab ? "yr" : "mo"}
                </span>
              )}
            </h1>
            <button
              className={`${key === 0
                ? "border border-[#388AEB] text-[#388AEB]"
                : "text-white btn-gradient"
                } rounded-[10px] text-sm h-10 w-full mt-5 mb-3 hover:shadow-md duration-200`}
            >
              {item.button}
            </button>
            <Link
              href="#additional-features"
              className="flex justify-center items-center text-[#388AEB] text-sm group"
            >
              See additional features
              <ArrowRight size={16} color="#388AEB" className="ml-1 transform group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-3 md:mt-[100px] pt-20 max-w-[1190px] w-full">
        <h1 className="mb-5 md:mb-10 text-center font-medium text-[28px] sm:text-[40px]"
          id="additional-features">
          Additional features
        </h1>
        <div className="flex border border-[#D6E6F7] rounded-[20px] overflow-hidden">
          <table className="w-full bg-white text-sm md:text-base">
            <thead>
              <tr className="text-[#212427]">
                <th className="text-left font-medium text-[#616A73] border border-t-0 border-l-0 border-[#D6E6F7] px-4 py-3 md:px-5 md:py-7">
                  Feature
                </th>
                <th className="font-medium border border-t-0 py-3 border-[#D6E6F7] md:w-[150px] lg:w-[190px] vertical-rl">
                  Starter
                </th>
                <th className="font-medium border border-t-0 py-3 border-[#D6E6F7] md:w-[150px] lg:w-[190px] vertical-rl">
                  Individual
                </th>
                <th className="font-medium border border-t-0 py-3 border-[#D6E6F7] md:w-[150px] lg:w-[190px] vertical-rl">
                  Professional
                </th>
                <th className="font-medium border border-t-0 py-3 border-[#D6E6F7] md:w-[150px] lg:w-[190px] border-r-0 vertical-rl">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingTable.map((row, key) => (
                <tr key={key}>
                  {row.map((item, rKey) => (
                    <td
                      key={rKey}
                      className={`border border-[#D6E6F7] px-2 md:px-5 py-4 text-[#616A73] ${rKey === 0 && "border-l-0"
                        } ${rKey === 4 && "border-r-0"} ${key === pricingTable.length - 1 && "border-b-0"
                        }`}
                    >
                      {rKey === 0 ? (
                        item
                      ) : item ? (
                        <CircleCheck
                          size={24}
                          color="#FF915B"
                          className="mx-auto"
                        />
                      ) : (
                        <CircleX
                          size={24}
                          color="#616A73"
                          className="mx-auto"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
