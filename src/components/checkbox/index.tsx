import { HTMLProps, ReactNode, forwardRef } from "react";

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'label' | 'title'> {
  label?: ReactNode;
  title?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { label, className, title, ...rest } = props;
  
    return (
      <div className={className}>
        {label !== undefined ? (
          <label className="Input-label mb-1">{label}</label>
        ) : null}
        <label className="Input-wrapper Checkbox-wrapper">
          <input
            {...rest}
            type="checkbox"
            ref={ref}
            className="hidden"
          />
          <span className="Checkbox-checkbox"></span>
          {title !== undefined ? (
            <span className="Checkbox-title">{title}</span>
          ) : null}
        </label>
      </div>
    );
  }
);
