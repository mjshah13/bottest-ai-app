/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { BotType, GlobalStateType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDuplicateBot = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { copyBot } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const duplicateBot = useCallback(
    async (botId: string, botLists: BotType[]) => {
      setIsLoading(true);
      try {
        const data = await request({
          url: `/v1/bots/${botId}/copy`,
          method: "POST",
        });
        copyBot(data, botLists);
      } catch (error: any) {
        console.error({ error });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { duplicateBot, isLoading };
};

export default useDuplicateBot;
