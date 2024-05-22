/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { GlobalStateType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

const useUsageChart = () => {
  const { request } = useApi();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [performanceChartData, setPerformanceChartData] =
  //     useState<PerformanceChartDataType | null>(null);
  const { user } = useUser();
  const { organization } = useOrganization();

  const fetchAnalyticsUsage = useCallback(
    async (suite_id: string, environment_id: string) => {
      //   let query = "";
      //   if (environmentId) {
      //     query = `?environment_id=${environmentId}`;
      //   }
      try {
        setIsLoading(true);
        const data = await request({
          url: `/v1/analytics/trending/usage?suite_id=${suite_id}&environment_id=${environment_id}`,
          method: "GET",
        });

        console.log(data);
      } catch (error: any) {
        setIsLoading(false);
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { fetchAnalyticsUsage, error, isLoading };
};

export default useUsageChart;
