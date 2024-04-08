"use client";

import React, { useState } from "react";
import CustomizeTest from "../../components/customizeTest";

const Organization = () => {
  const [isCustomizeTestModal, setIsCustomizeTestModal] = useState(false);
  return (
    <>
      <CustomizeTest
        title="Customize test: My second test"
        isCustomizeTestModal={isCustomizeTestModal}
        setIsCustomizeTestModal={setIsCustomizeTestModal}
      />

      <div className="h-[90vh] flex justify-center flex-col items-center">
        Organization
        <button onClick={() => setIsCustomizeTestModal(true)}>Open</button>
      </div>
    </>
  );
};

export default Organization;
