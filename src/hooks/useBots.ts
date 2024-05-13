/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback, useContext } from "react";
import { BotType, GlobalStateType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";
import { GlobalStateContext } from "../globalState";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useBots = (setSelectedBot: any) => {
  const { setBotLists } = useContext(GlobalStateContext) as GlobalStateType;
  const { user } = useUser();
  const { request } = useApi();
  const { organization } = useOrganization();
  const [error, setError] = useState<Error | null>(null);

  const fetchBots = useCallback(async () => {
    if (!user?.id) {
      return;
    }
    try {
      let data;
      if (organization) {
        data = await request({
          url: `/v1/organizations/${organization?.id}/bots`,
          method: "GET",
        });
      } else {
        data = await request({
          url: `/v1/users/${user.id}/bots`,
          method: "GET",
        });
      }

      const formattedData: BotType[] = data.data.map((bot: BotType) => ({
        id: bot.id,
        name: bot.name,
      }));

      setBotLists(formattedData);
      setSelectedBot(formattedData[0]);
    } catch (error: any) {
      console.error({ error });
      setError(error);
      toast.error(`Bots: ${error?.response?.data?.message}`);
    }
  }, [organization?.id, user?.id]);

  useEffect(() => {
    fetchBots();
  }, [organization?.id, user?.id]);

  return { error };
};

export default useBots;
