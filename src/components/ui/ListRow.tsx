import React from "react";
import { View, Text, Pressable, PressableProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { Colors } from "@/constants/colors";

export type ListRowProps = {
  iconName?: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;

  showChevron?: boolean;
  danger?: boolean;

  /** 是否為最後一列（控制底線） */
  isLast?: boolean;

  /** 想自訂右側內容時可用（例如 switch、badge） */
  rightSlot?: React.ReactNode;

  /** 讓外部傳 className 或 style 也行（可選） */
  className?: string;
} & Pick<
  PressableProps,
  "disabled" | "hitSlop" | "testID" | "accessibilityLabel"
>;

export function ListRow({
  iconName,
  label,
  value,
  onPress,
  showChevron = true,
  danger = false,
  isLast = false,
  rightSlot,
  className,
  ...rest
}: ListRowProps) {
  const { colorScheme } = useTheme();
  const colors = Colors[colorScheme];

  const disabled = rest.disabled ?? !onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={[
        "flex-row items-center px-4 py-4",
        !isLast
          ? "border-b border-border-light/60 dark:border-border-dark/40"
          : "",
        disabled ? "opacity-60" : "",
        className ?? "",
      ].join(" ")}
      {...rest}
    >
      {/* Left icon */}
      {iconName ? (
        <View className="mr-3 h-9 w-9 items-center justify-center">
          <Ionicons
            name={iconName}
            size={20}
            color={danger ? colors.icon.danger : colors.icon.default}
          />
        </View>
      ) : (
        <View className="mr-3 h-9 w-9" />
      )}

      {/* Label */}
      <Text
        className={[
          "flex-1 font-chineseRegular text-lg",
          danger
            ? "text-red-600 dark:text-red-300"
            : "text-text-light dark:text-text-dark",
        ].join(" ")}
      >
        {label}
      </Text>

      {/* Right: value OR slot */}
      {rightSlot ? (
        <View className="mr-2">{rightSlot}</View>
      ) : value ? (
        <Text className="mr-2 font-chineseRegular text-sm text-text-subtle-light dark:text-text-subtle-dark">
          {value}
        </Text>
      ) : null}

      {/* Chevron */}
      {showChevron ? (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.icon.default}
        />
      ) : null}
    </Pressable>
  );
}
