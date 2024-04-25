import { Reducer } from "react";
import { AppState } from "./types";
import { AppAction, AppStateType } from "./slice";
import { initialState } from "./state";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";

export const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
  const cloned = cloneDeep(state);

  switch (action.type) {
    case AppStateType.SET_META_VALUE:
      return set(cloned, `meta.${action.meta}`, action.payload);

    default:
      return cloned;
  }
};