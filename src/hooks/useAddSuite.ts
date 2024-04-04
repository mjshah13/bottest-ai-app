import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";

const useAddSuite = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { request } = useApi();

  const addSuite = useCallback(
    async (name: string, botId: string) => {
      try {
        const data = await request({
          url: `/v1/suites`,
          method: "POST",
          data: {
            name,
            bot_id: botId,
          },
        });
        console.log(data?.data, "hhhh");
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { addSuite, isLoading };
};

export default useAddSuite;
