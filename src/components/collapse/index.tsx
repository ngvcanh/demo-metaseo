/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { HTMLProps, PropsWithChildren, ReactNode, forwardRef, useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { useDisclosure } from "@/hooks/use-disclosure";
import clsx from "clsx";

export interface CollapseProps extends Omit<HTMLProps<HTMLDivElement>, 'title'> {
  title: ReactNode;
}

export const Collapse = forwardRef<HTMLDivElement, PropsWithChildren<CollapseProps>>(
  function Collapse(props, ref) {
    const { children, title, className, ...rest } = props;

    const [collapsed, { toggle }] = useDisclosure();
    const [height, setHeight] = useState<number>();

    const content = useRef<HTMLDivElement>(null);
    const body = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!body.current) {
        return;
      }

      const nextHeight = body.current.offsetHeight;
      nextHeight === height || setHeight(nextHeight);
    });

    return (
      <div {...rest} ref={ref} className={clsx("Collapse-root", className)}>
        <div className="Collapse-title" onClick={toggle}>
          <div className="Collapse-titleInner">
            {title}
          </div>
          <div
            className={clsx(
              "flex items-center justify-center h-11 w-11 min-w-[44px] -mr-2 transition-all",
              collapsed && "-rotate-90"
            )}
          >
            <IconChevronDown size={16} />
          </div>
        </div>
        <div
          ref={content}
          className={clsx("Collapse-content", height === undefined && "opacity-0 pointer-events-none")}
          style={{ height: collapsed ? 0 : height }}
        >
          <div className="Collapse-body" ref={body}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
