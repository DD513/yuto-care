import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { HomeTodo } from "../types";

type Props = {
  todos: HomeTodo[];
};

export const HomeTodoSection: React.FC<Props> = ({ todos }) => {
  return (
    <View className="mt-4 px-6">
      {/* 區塊標題列 */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-chineseBold text-xl text-text-light dark:text-text-dark">
          待辦清單
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="font-englishRegular text-xs text-text-subtle-light dark:text-text-subtle-dark">
            查看更多
          </Text>
        </Pressable>
      </View>

      <View className="space-y-3">
        {todos.map((todo) => (
          <Pressable
            key={todo.id}
            className="mb-2 rounded-3xl bg-surface-light px-4 py-3 shadow-sm shadow-black/5 active:opacity-95 dark:bg-surface-dark"
          >
            <View className="flex-row items-center">
              {/* 左側縮圖 */}
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 dark:bg-primary-dark/60">
                <Text className="font-chineseBold text-sm text-text-light dark:text-text-dark">
                  {todo.patient[0]}
                </Text>
              </View>

              {/* 右側文字 */}
              <View className="flex-1">
                <Text className="font-chineseRegular text-[11px] text-text-subtle-light dark:text-text-subtle-dark">
                  {todo.due}
                </Text>

                <Text className="mt-1 font-chineseBold text-base text-text-light dark:text-text-dark">
                  {todo.patient}（{todo.bed}）
                </Text>

                <Text className="mt-1 font-chineseBold text-sm text-primary dark:text-primary-dark">
                  {todo.type}｜{todo.severity}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </Pressable>
        ))}

        {todos.length === 0 && (
          <View className="rounded-3xl border border-dashed border-border-light px-4 py-3 dark:border-border-dark">
            <Text className="font-chineseRegular text-sm text-text-subtle-light dark:text-text-subtle-dark">
              今天沒有急需處理的任務，可以好好喘口氣 ✨
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
