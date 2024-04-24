"use client";
import {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Tab, TabProps } from "./tab";

export interface TabsProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  value?: number;
  onChangeTab?(value: number): void;
}

const TabsBase = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(props, ref) {
    const { children, value = 0, onChangeTab } = props;

    const [currentValue, setCurrentValue] = useState(value);

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

    

    return (
      <div ref={ref} className="Tabs-root">
        <div className="Tabs-listWrapper">
          {listChild.map((child, index) => {
            return isValidElement<TabProps>(child) ? cloneElement(child, {...child.props, key: index}) : null;
          })}
        </div>
        {listChild.length ? (
          <div className="Tabs-content">
            {new Array(listChild.length).fill(null).map((_, index) => {
              const tab = listChild.find((c) => c.props.value === index);

              if (!tab) {
                return null;
              }

              const { element } = tab.props;

              return (
                <div key={index} className="Tabs-pane">
                  {index === currentValue ? element : null}
                </div>
              );
            })}
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
