import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";

const useUpdateEnvironment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();

  const fetchUpdateEnvironment = useCallback(
    async (environmentID: string, name: string) => {
      try {
        const data = await request({
          url: `/v1/environments/${environmentID}`,
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

  return { fetchUpdateEnvironment, isLoading };
};

export default useUpdateEnvironment;
