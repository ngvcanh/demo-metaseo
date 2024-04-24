import { Reducer } from "react";
import { AppState } from "./types";
import { AppAction } from "./slice";
import { initialState } from "./state";
import cloneDeep from "lodash/cloneDeep";

export const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
  const cloned = cloneDeep(state);

  switch (action.type) {
    default:
      return cloned;
  }
};