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
  // evaluationId: EvaluationType,
  selectedEvaluation: any
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
      setIsLoading(true);
      try {
        const data = await request({
          url: `/v1/baselines`,
          method: "POST",
          data: {
            name,
            html_blob,
            test_id,
            conversation_json: selectedEvaluation?.conversation_json,
          },
        });

        if (data) {
          setDisabledEvalutions((prevDisabledEvalutions) => [
            ...prevDisabledEvalutions,
            selectedEvaluation?.id,
          ]);
        }
        addNewBaseline(data, baselines);
      } catch (error: any) {
        setIsLoading(false);
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedEvaluation, user, organization]
  );

  return { addBaseline, isLoading };
};

export default useAddBaseline;
