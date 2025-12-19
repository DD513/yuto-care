import React from "react";
import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  label: string;
  rightIconName?: React.ComponentProps<typeof Ionicons>["name"];
  onPressRightIcon?: () => void;
  rightIconColor?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  underlineClassName?: string;
} & TextInputProps;

export function UnderlineInput({
  label,
  rightIconName,
  onPressRightIcon,
  rightIconColor = "rgba(0,0,0,0.45)",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  underlineClassName = "",
  ...inputProps
}: Props) {
  const { colorScheme } = useTheme();

  return (
    <View className={containerClassName}>
      <Text
        className={`text-base font-chineseRegular text-text-light dark:text-text-dark ${labelClassName}`}
      >
        {label}
      </Text>

      <View
        className={`mt-2 flex-row items-center border-b border-border-light dark:border-border-dark pb-2 ${underlineClassName}`}
      >
        <TextInput
          {...inputProps}
          placeholderTextColor={
            inputProps.placeholderTextColor ??
            (colorScheme === "dark" ? "#9CA3AF" : "#6B7280")
          }
          className={`flex-1 py-2 font-chineseRegular text-lg text-text-light dark:text-text-dark ${inputClassName}`}
        />

        {rightIconName ? (
          <Pressable
            onPress={onPressRightIcon}
            hitSlop={10}
            className="pl-3 py-2"
          >
            <Ionicons name={rightIconName} size={20} color={rightIconColor} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
