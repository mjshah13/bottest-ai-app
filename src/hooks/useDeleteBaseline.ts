/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { BaselineType, GlobalStateType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDeleteBaseline = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { deleteBaselineData } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { request } = useApi();

  const deleteBaseline = useCallback(
    async (baselineId: string, baselines: BaselineType[]) => {
      try {
        const data = await request({
          url: `/v1/baselines/${baselineId}`,
          method: "DELETE",
        });

        deleteBaselineData(baselineId, baselines);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { deleteBaseline, isLoading };
};

export default useDeleteBaseline;
