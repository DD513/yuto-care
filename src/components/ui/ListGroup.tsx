import React from "react";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function ListGroup({ children, className }: Props) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <View
      className={[
        "rounded-3xl bg-surface-light dark:bg-surface-dark overflow-hidden",
        className ?? "",
      ].join(" ")}
    >
      {items.map((child, idx) => {
        const isLast = idx === items.length - 1;

        if (!React.isValidElement(child)) return child;

        // 如果外面已經手動給 isLast，就尊重外面
        const hasIsLastProp = Object.prototype.hasOwnProperty.call(
          child.props,
          "isLast"
        );

        return React.cloneElement(child as any, {
          ...(hasIsLastProp ? null : { isLast }),
        });
      })}
    </View>
  );
}
