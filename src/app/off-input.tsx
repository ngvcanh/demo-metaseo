/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useMemo } from "react";
import { CommonInputProps } from "./types";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { useApp } from "@/context/app/use-app";
import get from "lodash/get";

export type OffInputProps = CommonInputProps;

export const OffInput: FC<OffInputProps> = props => {
  const { name, render, label, title, checked, ...rest } = props;

  const { state: { meta }, setMeta } = useApp();

  const value = useMemo(() => get(meta, name) || "", [meta]);
  const isOff = useMemo(() => value === "off", [value]);

  const handleChangeCheckbox = (e: ChangeEvent<any>) => {
    setMeta(name, e.target.checked ? "off" : "");
  };

  const handleChange = (e: ChangeEvent<any>) => {
    setMeta(name, e.target.value);
  };

  return (
    <div>
      <label className="Input-label">{label}</label>
      <div className="flex w-full gap-4 items-center">
        <Checkbox title="Off" checked={isOff} onChange={handleChangeCheckbox} />
        <span className="whitespace-nowrap">- Or -</span>
        <Input
          {...rest}
          disabled={isOff}
          value={isOff ? "" : value}
          onChange={handleChange}
          className="w-full shrink grow-0"
        />
      </div>
    </div>
  );
};
