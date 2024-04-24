import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { BotType, GlobalStateType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useAddBot = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addBotRow } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const addBot = useCallback(
    async (name: string, botLists: BotType[]) => {
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

        addBotRow(data, botLists);
      } catch (error: any) {
        console.error({ error });
      } finally {
      }
    },
    [user?.id, organization?.id]
  );

  return { addBot, isLoading };
};

export default useAddBot;
