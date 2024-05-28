/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from "react";
import { UsageChartDataType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

const useUsageChart = () => {
  const { request } = useApi();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usageChartData, setUsageChartData] =
    useState<UsageChartDataType | null>(null);
  const { user } = useUser();
  const { organization } = useOrganization();

  const fetchUsageChart = useCallback(
    async (suite_id: string, environment_id: string) => {
      try {
        setIsLoading(true);
        const data = await request({
          url: `/v1/analytics/trending/usage?suite_id=${suite_id}&environment_id=${environment_id}`,
          method: "GET",
        });

        setUsageChartData(data);
      } catch (error: any) {
        setIsLoading(false);
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { fetchUsageChart, usageChartData, error, isLoading };
};

export default useUsageChart;
