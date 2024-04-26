import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import { BaselineType, GlobalStateType } from "../utils/typesInterface";

const useAddBaseline = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addNewBaseline } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const addBaseline = useCallback(
    async (
      name: string,
      html_blob: string,
      test_id: string,
      baselines: BaselineType[]
    ) => {
      try {
        const data = await request({
          url: `/v1/baselines`,
          method: "POST",
          data: {
            name,
            html_blob,
            test_id,
          },
        });

        addNewBaseline(data, baselines);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { addBaseline, isLoading };
};

export default useAddBaseline;
