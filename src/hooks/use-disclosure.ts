import { useState } from "react";

export interface UseDisclosureMethod {
  open(): void;
  close(): void;
  toggle(): void;
}

export type UseDisclosureReturn = [boolean, UseDisclosureMethod];

export function useDisclosure(defaultValue = false): UseDisclosureReturn {
  const [value, setValue] = useState(defaultValue);

  const open = () => setValue(true);
  const close = () => setValue(false);
  const toggle = () => setValue((p) => !p);

  return [value, { open, close, toggle }];
}
