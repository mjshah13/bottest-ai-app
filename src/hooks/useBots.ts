import { useState, useEffect, useCallback } from "react";
import { BotType } from "../utils/typesInterface";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useBots = (handleSelect: any) => {
  const { organization } = useOrganization();
  console.log(organization, "organization");

  // const {userId , orgId } = useAuth()

  // console.log({userId , orgId} , "auth")

  const [botLists, setBotLists] = useState<BotType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();

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
      if (formattedData.length === 1) {
        // Assuming handleSelect is a function that needs to be called when there is only one bot
        handleSelect("bot", formattedData[0]);
      }
    } catch (error: any) {
      console.error({ error });
      setError(error);
    }
  }, [user?.id, organization]);

  useEffect(() => {
    fetchBots();
  }, [user, organization]);

  return { botLists, fetchBots, error };
};

export default useBots;
