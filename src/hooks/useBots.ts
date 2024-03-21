import { useState, useEffect, useCallback } from "react";
import { BotType, UserResource } from "../utils/typesInterface";
import { useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useBots = (handleSelect: any) => {
  const [botLists, setBotLists] = useState<BotType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchBots = useCallback(async () => {
    if (!user?.id) {
      return;
    }
    try {
      const data = await request({
        url: `/v1/users/${user.id}/bots`,
        method: "GET",
      });
      const formattedData: BotType[] = data.data.map((bot: BotType) => ({
        id: bot.id,
        name: bot.name,
      }));
      setBotLists(formattedData);
      if (formattedData.length === 1) {
        // Assuming handleSelect is a function that needs to be called when there is only one bot
        handleSelect("bot", formattedData[0]);
      }
    } catch (error: any) {
      console.error({ error });
      setError(error);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchBots();
  }, [user]);

  return { botLists, fetchBots, error };
};

export default useBots;
