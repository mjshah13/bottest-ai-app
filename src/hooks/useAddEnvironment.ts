import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";

const useAddEnvironment = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { request } = useApi();

  const fetchAddEnvironment = useCallback(
    async (name: string, botId: string) => {
      try {
        const data = await request({
          url: `/v1/environments`,
          method: "POST",
          data: {
            name,
            url: "http://www.dev.example.com/my/chatbot",
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

  return { fetchAddEnvironment, isLoading };
};

export default useAddEnvironment;
