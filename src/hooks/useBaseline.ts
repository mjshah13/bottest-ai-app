/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import {
  BaselineType,
  GlobalStateType,
  SuiteType,
} from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { GlobalStateContext } from "../globalState";

const useBaseline = () => {
  // const [baselines, setBaselines] = useState<BaselineType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { organization } = useOrganization();
  const { user } = useUser();
  const [error, setError] = useState<Error | null>(null);

  const { setBaselines } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const fetchBaseline = useCallback(
    async (test_Id: string, setSelectedBaseline?: any) => {
      setIsLoading(true);
      try {
        const data = await request({
          url: `/v1/tests/${test_Id}/baselines`,
          method: "GET",
        });

        setBaselines(data?.data);
        if (data?.data?.length === 1) {
          setSelectedBaseline({
            name: data?.data[0]?.name,
            id: data?.data[0]?.id,
          });
        }
      } catch (error: any) {
        console.error({ error });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { fetchBaseline, error, isLoading };
};

export default useBaseline;
