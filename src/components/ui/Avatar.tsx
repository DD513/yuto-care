import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

type Props = {
  name?: string | null;
  uri?: string | ImageSourcePropType; // ✅ 支援兩種類型
  // 之後接真實頭貼
  size?: number; // 預設 44
  className?: string;
};

export function Avatar({ name, uri, size = 44, className }: Props) {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

  // ✅ 判斷 uri 類型
  const imageSource = typeof uri === "string" ? { uri } : uri;

  return (
    <View
      className={[
        "items-center justify-center rounded-full bg-secondary/40 dark:bg-secondary/80 overflow-hidden",
        className ?? "",
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      {uri ? (
        <Image
          source={imageSource}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      ) : (
        <Text className="font-chineseBold text-base text-text-light dark:text-text-dark">
          {initials}
        </Text>
      )}
    </View>
  );
}
