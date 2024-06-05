"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { BlogItem } from "../components/blogItem";
import { Post, allPosts } from "../../../.contentlayer/generated";
import { useDebounce } from "react-use";

const BlogPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [parentSearchValue, setParentSearchValue] = useState("");
  const [data, setData] = useState<Post[]>();

  const [, cancel] = useDebounce(
    () => {
      setParentSearchValue(searchValue.trim());
    },
    500,
    [searchValue]
  );

  // Search the posts based on user's search keywords.
  const handleSearch = (_event: React.SyntheticEvent, newValue: string) => {
    cancel();
    setSearchValue(newValue);
  };

  useEffect(() => {
    const filteredData = allPosts.filter(
      (item) =>
        item.title.toLowerCase().includes(parentSearchValue.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(parentSearchValue.toLowerCase())
    );
    setData(filteredData);
  }, [allPosts, parentSearchValue]);

  return (
    <div className="max-w-[1440px] m-auto w-full px-3 md:px-8 pt-[72px] pb-3 lg:pt-[104px] md:pb-8">
      <div className="bg-[#F7F9FB] pt-20 pb-10 md:py-16 px-5 md:px-10 lg:px-[90px] rounded-[20px] flex md:flex-row flex-col items-center md:mb-8 mb-3">
        <div className="w-full md:mr-[50px] lg:mr-[100px] md:mb-0 mb-10">
          <h1 className="font-medium text-[40px] lg:text-[52px] leading-[48px] lg:leading-[60px] mb-5 sm:mb-8 text-[#212427]">
            The bottest.ai Blog
          </h1>
          <p className="text-[#616A73] text-base mb-5 sm:mb-8 max-w-[466px]">
            Stay in the loop on the latest developments in AI and how they
            impact your business.
          </p>
          <div className="bg-white border border-[#D6E6F7] rounded-xl px-4 py-3 flex items-center">
            <span>
              <Search color="#000000" size={16} className="mr-4" />
            </span>
            <input
              type="text"
              className="w-full outline-none placeholder:text-[#616A73] text-sm"
              placeholder="Search by key words"
              value={searchValue}
              onChange={(e) => {
                handleSearch(e, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="max-w-[588px] w-full">
          <Image
            src="/assets/blog-banner.svg"
            alt=""
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="">
        {allPosts[0] && (
          <Link href={allPosts[0].slug} target="_blank" className="border border-[#D6E6F7] min-h-[320px] rounded-[20px] bg-white flex flex-col sm:flex-row overflow-hidden mb-8 group hover:shadow-md duration-100">
            <div className="bg-[#D6E6F7] w-full sm:w-[45%] min-h-[228px] flex relative border-b sm:border-b-0 sm:border-r border-[#D6E6F7]">
              <Image src={allPosts[0].image} fill alt="" objectFit="cover" />
            </div>
            <div className="py-3 px-5 sm:p-8 flex flex-col justify-center w-full sm:w-[55%] relative">
              <div className="uppercase h-10 mb-3 sm:mb-0 px-6 bg-[#FF915B0D] border border-dashed border-[#FF915B] text-[#FF915B] text-[13px] rounded-xl w-fit sm:absolute flex items-center right-4 top-4">
                featured post
              </div>
              <span className="text-[#212427] text-[28px] leading-8 font-medium mb-1 text-ellipsis line-clamp-3 ">
                {allPosts[0].title}{" "}
              </span>
              <p className="text-ellipsis line-clamp-2 text-[#616A73] text-base">
                {allPosts[0].description}
              </p>
            </div>
          </Link>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data?.map((item, key) => (
            <BlogItem
              date={new Date(item.date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              img={item.image}
              link={item.slug}
              title={item.title}
              subtitle={item.description || ""}
              key={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
