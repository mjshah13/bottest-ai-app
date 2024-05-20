"use client";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import ConfigureComparisonModal from "../../components/configureComparisonSuiteRuns";

const Organization = () => {
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  return (
    <>
      <div className="h-[90vh] flex justify-center flex-col items-center">
        <button onClick={() => setIsComparisonModalOpen(true)}>open</button>
        <ConfigureComparisonModal
          title="Configure Comparison Suite Run"
          isComparisonModalOpen={isComparisonModalOpen}
          setIsComparisonModalOpen={setIsComparisonModalOpen}
        />
        Organization
      </div>
    </>
  );
};

export default Organization;
