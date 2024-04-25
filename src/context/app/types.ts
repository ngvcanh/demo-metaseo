import { MetadataConfiguration } from "metaseo";

export interface AppState {
  meta: MetadataConfiguration;
}

export interface AppValue {
  state: AppState;
  setMeta(key: string, value: any): void;
}
