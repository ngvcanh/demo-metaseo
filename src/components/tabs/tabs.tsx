"use client";
import {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tab, TabProps } from "./tab";

const scrollTo = (element: HTMLDivElement | null, left: number, duration = 1000) => {
  if (!element) {
    return;
  }

  if (duration > 0) {
    const ratio = left / duration;
    for (let i = 1; i <= duration; i++) {console.log(ratio * i);
      element.scroll({ left: ratio * i, behavior: "instant" });
    }
  }

  element.scroll({ left, behavior: "instant" });
};

export interface TabsProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  value?: number;
  onChangeTab?(value: number): void;
  unmountOnExit?: boolean;
}

const TabsBase = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(props, ref) {
    const { children, value = 0, unmountOnExit, onChangeTab } = props;

    const [currentValue, setCurrentValue] = useState(value);

    const indicator = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);
    const panes = useRef<HTMLDivElement>(null);

    const listChild = useMemo(
      () => Children.toArray(children).filter((c) => isValidElement(c)) as ReactElement<TabProps>[],
      [children]
    );

    useEffect(() => {
      let nextValue = Math.floor(value);

      if (nextValue < 0 && nextValue >= listChild.length) {
        nextValue = 0;
      }

      nextValue === currentValue || setCurrentValue(nextValue);
      nextValue === value || onChangeTab?.(nextValue);

      value === currentValue || setCurrentValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const fixIndicator = useCallback(() => {
      if (!container.current || !indicator.current) {
        return;
      }

      const items = Array.from(container.current.childNodes) as HTMLButtonElement[];
      const currentTab = items[currentValue];

      if (!currentTab) {
        return;
      }

      indicator.current.style.width = currentTab.offsetWidth + "px";
      indicator.current.style.left = currentTab.offsetLeft + "px";

    }, [currentValue]);

    useEffect(() => {
      fixIndicator();
    }, [fixIndicator]);

    useEffect(() => {
      if (!content.current || !panes.current) {
        return;
      }

      panes.current.style.marginLeft = -currentValue * content.current.clientWidth + "px";

      // scrollTo(content.current, currentValue * content.current.clientWidth);

      // content.current.scroll({
      //   left: currentValue * content.current.clientWidth,
      //   behavior: "smooth",
      // }, );
    }, [currentValue]);

    useEffect(() => {
      if (!panes.current) {
        return;
      }

      (Array.from(panes.current.childNodes) as HTMLDivElement[]).forEach((item) => {
        item.style.width = content.current!.clientWidth + "px";
        item.style.minWidth = content.current!.clientWidth + "px";
        item.style.maxWidth = content.current!.clientWidth + "px";
      });
    });

    const handleClickTab = (index: number) => () => setCurrentValue(index);

    return (
      <div ref={ref} className="Tabs-root">
        <div className="Tabs-listWrapper" ref={container}>
          {listChild.map((child, index) => {
            return isValidElement<TabProps>(child)
              ? cloneElement(child, {
                ...child.props,
                currentValue,
                onClick: handleClickTab(index),
                key: index
              })
              : null;
          })}
          <div className="Tabs-indicator" ref={indicator}></div>
        </div>
        {listChild.length ? (
          <div className="Tabs-content" ref={content}>
            <div className="Tabs-panes" ref={panes}>
              {new Array(listChild.length).fill(null).map((_, index) => {
                const tab = listChild.find((c) => c.props.value === index);

                if (!tab) {
                  return null;
                }

                const { element } = tab.props;

                return (
                  <div key={index} className="Tabs-pane" style={{ width: "100%", minWidth: "100%" }}>
                    {currentValue === index || unmountOnExit === false ? element : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

type TabsComponent = typeof TabsBase & {
  Tab: typeof Tab;
};

export const Tabs: TabsComponent = Object.assign(TabsBase, {
  Tab,
});
