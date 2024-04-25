"use client";
import { HTMLProps, ReactElement, ReactNode, forwardRef } from "react";
import clsx from "clsx";

export interface TabProps extends Omit<HTMLProps<HTMLButtonElement>, 'title'> {
  element: ReactElement;
  value: number;
  currentValue?: number;
  title?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  function Tab(props, ref) {
    const {title, currentValue, value, element, ...rest} = props;
  
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={clsx({
          "Tab-button": true,
          "Tab-active": value !== undefined && currentValue === value,
        })}
        aria-label="Tab item"
      >
        {typeof title === "string" || typeof title === "number"
          ? (
            <span className="Tab-label">
              {title}
            </span>
          )
          : title
        }
      </button>
    );
  }
);
