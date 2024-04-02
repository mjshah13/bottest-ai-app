import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";

const useUpdateSuite = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();

  const fetchUpdateSuite = useCallback(
    async (suiteID: string, name: string) => {
      try {
        const data = await request({
          url: `/v1/suites/${suiteID}`,
          method: "PATCH",
          data: {
            name: name,
          },
        });

        console.log(data?.data);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { fetchUpdateSuite, isLoading };
};

export default useUpdateSuite;
