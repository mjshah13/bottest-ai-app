/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { SpecificSuiteDataType } from "../utils/typesInterface";

const useSpecificSuite = () => {
  const { organization } = useOrganization();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { user } = useUser();
  const { request } = useApi();

  const [specificSuiteData, setSpecificSuiteData] =
    useState<SpecificSuiteDataType>({
      reporting_comparison_suite_run_id: "",
      reporting_comparison_environment_id: "",
      reporting_comparison_configuration: "",
    });

  const fetchSpecificSuite = useCallback(
    async (suiteId: string) => {
      try {
        const data = await request({
          url: `/v1/suites/${suiteId}`,
          method: "GET",
        });

        setSpecificSuiteData(data);
      } catch (error) {
        console.error("Error fetching test suites:", error);
      } finally {
      }
    },
    [user, organization]
  );

  return {
    fetchSpecificSuite,
    isLoading,
    specificSuiteData,
    setSpecificSuiteData,
  };
};

export default useSpecificSuite;
