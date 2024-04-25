import clsx from "clsx";
import { FocusEvent, HTMLProps, ReactNode, Ref, forwardRef, useRef } from "react";

export interface InputSingleProps extends  Omit<HTMLProps<HTMLInputElement>, 'label'> {
  label?: ReactNode;
  multiline?: false;
};

export interface InputMiltilineProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'label'> {
  label?: ReactNode;
  multiline: true;
}

export type InputProps = InputSingleProps | InputMiltilineProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input(props, ref) {
    const { label, onFocus, onBlur, className, value, multiline, ...rest } = props;


    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleFocus = (e: FocusEvent<any>) => {
      if (wrapperRef.current) {
        wrapperRef.current.classList.contains('Input-focused') || wrapperRef.current.classList.add('Input-focused');
      }

      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<any>) => {
      if (wrapperRef.current) {
        wrapperRef.current.classList.contains('Input-focused') && wrapperRef.current.classList.remove('Input-focused');
      }

      onBlur?.(e);
    };

    return (
      <div className={className}>
        {label !== undefined ? (
          <label className="Input-label mb-1">{label}</label>
        ) : null}
        <div ref={wrapperRef} className={clsx("Input-wrapper", multiline && "Input-multiline")}>
          {multiline ? (
            <textarea
              {...rest as InputMiltilineProps}
              ref={ref as Ref<HTMLTextAreaElement>}
              className="w-full rounded outline-0 p-2 text-sm"
            >{value}</textarea>
          ) : (
            <input
              {...rest as InputSingleProps}
              ref={ref as Ref<HTMLInputElement>}
              className="w-full h-full rounded outline-0 px-2 text-sm"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>
    );
  }
);
