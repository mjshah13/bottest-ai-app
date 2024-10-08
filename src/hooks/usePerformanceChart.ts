/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { PerformanceChartDataType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

const usePerformanceChart = () => {
  const { request } = useApi();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [performanceChartData, setPerformanceChartData] =
    useState<PerformanceChartDataType | null>(null);
  const { user } = useUser();
  const { organization } = useOrganization();

  const fetchPerformanceChart = useCallback(
    async (suite_id: string, environment_id: string) => {
      try {
        setIsLoading(true);
        const data = await request({
          url: `/v1/analytics/trending/performance?suite_id=${suite_id}&environment_id=${environment_id}`,
          method: "GET",
        });

        setPerformanceChartData(data);
      } catch (error: any) {
        setIsLoading(false);
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { performanceChartData, fetchPerformanceChart, error, isLoading };
};

export default usePerformanceChart;
