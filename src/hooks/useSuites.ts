import { useState, useCallback } from "react";
import { BotandSuiteModalType, SuiteType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useSuites = () => {
  const { organization } = useOrganization();

  const [suiteLists, setSuiteLists] = useState<SuiteType[]>([]);
  const [suiteModaldata, setSuiteModalData] = useState<BotandSuiteModalType[]>(
    []
  );

  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchSuites = useCallback(
    async (userBot: string) => {
      if (!user?.id) {
        return;
      }
      try {
        const data = await request({
          url: `/v1/bots/${userBot}/suites`,
          method: "GET",
        });
        setSuiteModalData(
          data.data.map((bot: BotandSuiteModalType) => ({
            id: bot.id,
            name: bot.name,
            info: `this is ${bot.name}`,
            description: "",
          }))
        );
        const selectDataItems: SuiteType[] =
          data?.data?.map(({ id, name }: SuiteType) => ({
            id,
            name,
          })) || [];
        setSuiteLists(selectDataItems);
      } catch (error: any) {
        console.error({ error });
        setError(error);
        toast.error(`Suites: ${error?.response?.data?.message}`);
      }
    },
    [user, organization]
  );

  return { suiteLists, suiteModaldata, setSuiteModalData, fetchSuites, error };
};

export default useSuites;
