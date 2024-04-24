import { createContext } from "react";
import { AppValue } from "./types";
import { initialState } from "./state";

export const AppContext = createContext<AppValue>({
  state: {
    ...initialState,
  }
});
