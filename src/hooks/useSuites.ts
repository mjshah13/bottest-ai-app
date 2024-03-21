import { useState, useCallback } from "react";
import { SuiteType } from "../utils/typesInterface";
import { useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useSuites = () => {
  const [suiteLists, setSuiteLists] = useState<SuiteType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchSuites = useCallback(
    async (userBot: string) => {
      if (!user?.id) {
        return;
      }
      try {
        const data = await request({
          url: `/v1/bots/${userBot}/suites`,
          method: "GET",
        });

        const selectDataItems: SuiteType[] =
          data?.data?.map(({ id, name }: SuiteType) => ({
            id,
            name,
          })) || [];
        setSuiteLists(selectDataItems);
      } catch (error: any) {
        console.error({ error });
        setError(error);
      }
    },
    [user?.id]
  );

  return { suiteLists, fetchSuites, error };
};

export default useSuites;
