import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  EnvironmentType,
  GlobalStateType,
  SuiteType,
} from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDeleteEnvironment = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { deleteEnvironmentRow } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const { request } = useApi();

  const deleteEnvironment = useCallback(
    async (environmentId: string, environmentLists: EnvironmentType[]) => {
      try {
        const data = await request({
          url: `/v1/environments/${environmentId}`,
          method: "DELETE",
        });
        deleteEnvironmentRow(environmentId, environmentLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { deleteEnvironment, isLoading };
};

export default useDeleteEnvironment;
