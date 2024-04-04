import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";

const useUpdateBot = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();

  const updateBot = useCallback(
    async (botID: string, name: string) => {
      try {
        const data = await request({
          url: `/v1/bots/${botID}`,
          method: "PATCH",
          data: {
            name,
          },
        });
        console.log(data?.data, "hhhh");
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateBot, isLoading };
};

export default useUpdateBot;
