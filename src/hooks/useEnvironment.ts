import { useState, useCallback } from "react";
import { EnvironmentType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useEnvironment = () => {
  const { organization } = useOrganization();

  const [environmentLists, setEnvironmentLists] = useState<
    EnvironmentType[] | null
  >(null);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchEnvironment = useCallback(
    async (userBot: string) => {
      if (!user?.id) {
        return;
      }
      try {
        const data = await request({
          url: `/v1/bots/${userBot}/environments`,
          method: "GET",
        });
        const selectDataItems: EnvironmentType[] =
          data?.data?.map(({ id, name }: EnvironmentType) => ({
            id,
            name,
          })) || [];
        setEnvironmentLists(selectDataItems);
      } catch (error: any) {
        console.error({ error });
        setError(error);
        toast.error(`Environment: ${error?.response?.data?.message}`);
      }
    },
    [user, organization]
  );

  return { environmentLists, fetchEnvironment, error };
};

export default useEnvironment;
