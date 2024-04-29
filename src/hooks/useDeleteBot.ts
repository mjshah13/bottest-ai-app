/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  BotType,
  EnvironmentType,
  GlobalStateType,
} from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDeleteBot = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { deleteBotRow } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const deleteBot = useCallback(
    async (botId: string, botLists: BotType[]) => {
      try {
        const data = await request({
          url: `/v1/bots/${botId}`,
          method: "DELETE",
        });
        deleteBotRow(botId, botLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { deleteBot, isLoading };
};

export default useDeleteBot;
