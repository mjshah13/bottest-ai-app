import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import { BotType, GlobalStateType } from "../utils/typesInterface";

const useUpdateBot = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();
  const { updateBotRow } = useContext(GlobalStateContext) as GlobalStateType;

  const updateBot = useCallback(
    async (botID: string, name: string, botLists: BotType[]) => {
      try {
        const data = await request({
          url: `/v1/bots/${botID}`,
          method: "PATCH",
          data: {
            name,
          },
        });

        updateBotRow(data, botLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateBot, isLoading };
};

export default useUpdateBot;
