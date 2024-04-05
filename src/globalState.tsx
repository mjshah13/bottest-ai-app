import { createContext } from "react";
import { GlobalStateType } from "./utils/typesInterface";

export const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);
