/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import {
  BotType,
  CustomizeTestData,
  GlobalStateType,
  TestType,
} from "../utils/typesInterface";

const useUpdateTest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();
  const { updateTestdata } = useContext(GlobalStateContext) as GlobalStateType;

  const updateTest = useCallback(
    async (
      testId: string,
      customizeTestData: CustomizeTestData,
      testData: TestType[] | null
    ) => {
      try {
        const data = await request({
          url: `/v1/tests/${testId}`,
          method: "PATCH",
          data: customizeTestData,
        });

        updateTestdata(data, testData);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateTest, isLoading };
};

export default useUpdateTest;
