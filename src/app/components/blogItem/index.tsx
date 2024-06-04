import Image from "next/image";
import Link from "next/link";
import React from "react";

type BlogItemProps = {
  img: string;
  title: string;
  subtitle: string;
  date: string;
  link?: string;
};

export const BlogItem: React.FC<BlogItemProps> = (props) => {
  return (
    <Link href={props.link || ""} target="_blank" className="border border-[#D6E6F7] rounded-[20px] bg-white overflow-hidden group hover:shadow-lg duration-100">
      <div className="relative min-h-[186px] bg-[#D6E6F7] border-b border-[#D6E6F7]">
        <Image src={props.img} alt="" fill objectFit="cover" />
      </div>
      <div className="mt-3 px-5 pb-5">
        <span className="mb-1 text-[#616A73] text-xs">{props.date}</span>
        <span className="line-clamp-2 text-ellipsis mb-1 text-[#212427] text-lg font-medium">
          {props.title}
        </span>
        <p className="line-clamp-2 text-ellipsis text-[#616A73] text-sm">
          {props.subtitle}
        </p>
      </div>
    </Link>
  );
};
