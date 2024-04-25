import { InputProps } from "@/components/input";

export interface RenderProps {
  value: string;
  onChange(...event: any[]): void;
}

export type CommonInputProps = InputProps & {
  name: string;
  render?(props: RenderProps): JSX.Element;
}
