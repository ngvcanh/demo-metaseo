/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useMemo } from "react";
import { Input } from "@/components/input";
import { useApp } from "@/context/app/use-app";
import { CommonInputProps } from "./types";
import get from "lodash/get";

export type FormInputProps = CommonInputProps;

export const FormInput: FC<FormInputProps> = (props) => {
  const {name, render, ...rest} = props;
  const {state: { meta }, setMeta} = useApp();

  const value = useMemo(() => get(meta, name) || "", [meta]);

  const onChange = (e: ChangeEvent<any>) => {
    setMeta(name, e.target.value);
  };

  return render
    ? render({ value, onChange })
    : <Input {...rest} value={value} onChange={onChange} />;
};