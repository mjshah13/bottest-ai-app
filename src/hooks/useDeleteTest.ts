/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { GlobalStateType, TestType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDeleteTest = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { deleteTestRuns } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const deleteTest = useCallback(
    async (testId: string, testData: TestType[] | null) => {
      try {
        const data = await request({
          url: `/v1/tests/${testId}`,
          method: "DELETE",
        });

        deleteTestRuns(testId, testData);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { deleteTest, isLoading };
};

export default useDeleteTest;
