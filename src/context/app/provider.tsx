"use client";
import { FC, PropsWithChildren, useReducer } from "react";
import { AppContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";
import { appSlice } from "./slice";

export const AppProvider: FC<PropsWithChildren> = (props) => {
  const {children} = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMeta = (key: string, value: any) => dispatch(appSlice.setMeta(key, value));

  return (
    <AppContext.Provider
      value={{
        state,
        setMeta,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
