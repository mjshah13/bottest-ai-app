import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import { BotAndSuiteModalType, BotType } from "../utils/typesInterface";

interface GlobalStateType {
  botLists: BotType[];
  setBotLists: React.Dispatch<React.SetStateAction<BotType[]>>;
  botModalData: BotAndSuiteModalType[];
  setBotModalData: React.Dispatch<React.SetStateAction<BotAndSuiteModalType[]>>;
}

const useUpdateBot = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();
  const { botModalData, setBotModalData } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

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
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateBot, isLoading };
};

export default useUpdateBot;
