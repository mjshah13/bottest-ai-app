import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";
import { EnvironmentType, GlobalStateType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useUpdateEnvironment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();
  const { updateEnvironmentRow } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  const updateEnvironment = useCallback(
    async (
      environmentID: string,
      name: string,
      environmentLists: EnvironmentType[]
    ) => {
      try {
        const data = await request({
          url: `/v1/environments/${environmentID}`,
          method: "PATCH",
          data: {
            name: name,
          },
        });

        updateEnvironmentRow(data, environmentLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateEnvironment, isLoading };
};

export default useUpdateEnvironment;
