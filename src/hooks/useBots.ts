import { useState, useEffect, useCallback } from "react";
import { BotAndSuiteModalType, BotType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useBots = (setSelectedBot: any) => {
  const { user } = useUser();
  const { request } = useApi();
  const { organization } = useOrganization();
  const [botLists, setBotLists] = useState<BotType[]>([]);
  const [botModalData, setBotModalData] = useState<BotAndSuiteModalType[]>([]);
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

      setBotModalData(
        data.data.map((bot: BotAndSuiteModalType) => ({
          id: bot.id,
          name: bot.name,
          info: `this is ${bot.name}`,
          description: `this is ${bot.name}`,
        }))
      );
      const formattedData: BotType[] = data.data.map((bot: BotType) => ({
        id: bot.id,
        name: bot.name,
      }));
      setBotLists(formattedData);
      if (formattedData.length === 1) {
        // Assuming handleSelect is a function that needs to be called when there is only one bot
        setSelectedBot(formattedData[0]);
      }
    } catch (error: any) {
      console.error({ error });
      setError(error);
      toast.error(`Bots: ${error?.response?.data?.message}`);
    }
  }, [organization?.id, user?.id]);

  useEffect(() => {
    fetchBots();
  }, [organization?.id, user?.id]);

  return { botLists, fetchBots, botModalData, error, setBotModalData };
};

export default useBots;
