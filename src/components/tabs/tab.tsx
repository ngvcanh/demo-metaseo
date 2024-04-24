"use client";
import { HTMLProps, ReactElement, ReactNode, forwardRef } from "react";

export interface TabProps extends Omit<HTMLProps<HTMLButtonElement>, 'title'> {
  element: ReactElement;
  value: number;
  currentValue?: number;
  title?: ReactNode;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  function Tab(props, ref) {
    const {title} = props;
  
    return (
      <button ref={ref} type="button" className="Tab-button">
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
