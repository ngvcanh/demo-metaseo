export enum AppStateType {
  SET_META_VALUE = "@demometaseo/app-state/setMetaValue",
}

export interface AppStateSetMetaAction {
  type: AppStateType.SET_META_VALUE;
  payload: any;
  meta: string;
}

export type AppAction = AppStateSetMetaAction;

export const appSlice = {
  setMeta(meta: string, payload: any): AppStateSetMetaAction {
    return { type: AppStateType.SET_META_VALUE, payload, meta };
  },
};
