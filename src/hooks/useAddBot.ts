import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";

const useAddBot = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { request } = useApi();

  const addBot = useCallback(
    async (name: string) => {
      try {
        let organizationPayload = {
          name,
          organization_id: organization?.id,
        };
        let userPayload = {
          name,
          user_id: user?.id,
        };

        const data = await request({
          url: `/v1/bots`,
          method: "POST",
          data: organization?.id ? organizationPayload : userPayload,
        });

        console.log(data?.data);
      } catch (error: any) {
        console.error({ error });
      } finally {
      }
    },
    [user, organization]
  );

  return { addBot, isLoading };
};

export default useAddBot;
