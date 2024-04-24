"use client";
import { FC, PropsWithChildren, useReducer } from "react";
import { AppContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";

export const AppProvider: FC<PropsWithChildren> = (props) => {
  const {children} = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{
      state,
    }}>
      {children}
    </AppContext.Provider>
  );
};
