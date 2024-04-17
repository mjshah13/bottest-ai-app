import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { EnvironmentType, GlobalStateType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useAddEnvironment = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addEnvironmentRow } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { request } = useApi();

  const addEnvironment = useCallback(
    async (data: any, environmentLists: EnvironmentType[]) => {
      try {
        const { id, name, url } = await request({
          url: `/v1/environments`,
          method: "POST",
          data,
          // data: {
          //   name,
          //   url: "http://www.dev.example.com/my/chatbot",
          //   bot_id: botId,
          // },
        });
        addEnvironmentRow({ id, name, url }, environmentLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { addEnvironment, isLoading };
};

export default useAddEnvironment;
