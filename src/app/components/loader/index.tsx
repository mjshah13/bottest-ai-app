import React from "react";
import { Oval } from "react-loader-spinner";

interface Loader {}

const Loader: React.FC<Loader> = ({}: Loader) => {
  return (
    <div className="flex justify-center items-center w-full h-screen fixed top-0 bottom-0 right-0 left-0 z-[1400] bg-black opacity-60  ">
      <Oval secondaryColor="#f7f7f7" color="#388aeb" height={340} width={240} />
    </div>
  );
};

export default Loader;
