/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { EnvironmentType, GlobalStateType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";
import { GlobalStateContext } from "../globalState";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useEnvironment = (setSelectedEnvironment: any) => {
  const { organization } = useOrganization();

  const { setEnvironmentLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchEnvironment = useCallback(
    async (userBot: string | null) => {
      if (!user?.id) {
        return;
      }
      try {
        const data = await request({
          url: `/v1/bots/${userBot}/environments`,
          method: "GET",
        });

        const selectDataItems: EnvironmentType[] =
          data?.data?.map(({ id, name, url }: EnvironmentType) => ({
            id,
            name,
            url,
          })) || [];
        setEnvironmentLists(selectDataItems);
        setSelectedEnvironment(selectDataItems[0]);
      } catch (error: any) {
        console.error({ error });
        setError(error);
        toast.error(`Environment: ${error?.response?.data?.message}`);
      }
    },
    [user, organization]
  );

  return {
    fetchEnvironment,
    error,
  };
};

export default useEnvironment;
