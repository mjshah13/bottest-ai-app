/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback, useContext } from "react";
import { AnalyticsReportType, BotType, GlobalStateType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";


// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useAnalyticsReport = () => {
    const { request } = useApi();
  const [data, setData] = useState<AnalyticsReportType>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const { organization } = useOrganization();
  const [error, setError] = useState<Error | null>(null);


  const fetchAnalyticsReport = useCallback(async (suite_id : string) => {
    if(!user?.id) return
    setLoading(true);
    try {
      const data = await request({
        url: `/v1/analytics/report?suite_run_id=${suite_id}`,
        method: "GET",
      });

      setData(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching analytics report", error);
    } finally {
      setLoading(false);
    }
  },
[user , organization ])


  return { error , fetchAnalyticsReport, loading , data };
};

export default useAnalyticsReport;
