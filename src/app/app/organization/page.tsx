"use client";

import React, { useState } from "react";
import CustomizeTest from "../../components/customizeTest";
import TestResult from "../../components/testResult";

const Organization = () => {
  const [isCustomizeTestModal, setIsCustomizeTestModal] = useState(false);
  const [isTestResultModal, setIsTestResultModal] = useState(false);

  return (
    <>
      <TestResult
        title="Test results: My second test"
        isTestResultModal={isTestResultModal}
        setIsTestResultModal={setIsTestResultModal}
      />
      {/* <CustomizeTest
        title="Customize test: My second test"
        isCustomizeTestModal={isCustomizeTestModal}
        setIsCustomizeTestModal={setIsCustomizeTestModal}
      /> */}

      <div className="h-[90vh] flex justify-center flex-col items-center">
        Organization
        <button onClick={() => setIsTestResultModal(true)}>Open</button>
      </div>
    </>
  );
};

export default Organization;
