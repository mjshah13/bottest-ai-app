import { useState, useCallback } from "react";
import { TestType } from "../utils/typesInterface";
import { useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useTestsDetails = () => {
  const [testDetails, setTestDetails] = useState<TestType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { user } = useUser();
  const { request } = useApi();
  const fetchTestDetails = useCallback(
    async (testId: string, environmentId: string) => {
      if (!user?.id) {
        return;
      }
      try {
        let query = "";
        if (environmentId) {
          query = `?environment_id=${environmentId}`;
        }
        return request({
          url: `/v1/tests/${testId}/test_runs${query}`,
          method: "GET",
        });
      } catch (error) {
        console.error({ error });
      } finally {
      }
    },
    [user?.id]
  );

  return { testDetails, fetchTestDetails, error };
};

export default useTestsDetails;
