/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import {
  BaselineType,
  EvaluationType,
  GlobalStateType,
} from "../utils/typesInterface";

const useAddBaseline = (
  setDisabledEvalutions: React.Dispatch<React.SetStateAction<EvaluationType[]>>,
  evaluationId: EvaluationType
) => {
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

        if (data) {
          setDisabledEvalutions((prevDisabledEvalutions) => [
            ...prevDisabledEvalutions,
            evaluationId,
          ]);
        }
        addNewBaseline(data, baselines);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [evaluationId, user, organization]
  );

  return { addBaseline, isLoading };
};

export default useAddBaseline;
