import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";

const useAddBaseline = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { request } = useApi();

  const addBaseline = useCallback(
    async (name: string, html_blob: string, test_id: string) => {
      try {
        const data = await request({
          url: `/v1/baselines`,
          method: "POST",
          data: {
            name,
            html_blob,
            test_id,
          },
        });

        console.log(data);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { addBaseline, isLoading };
};

export default useAddBaseline;
