import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import type { EducationCard } from "../types";

type Props = {
  cards: EducationCard[];
};

export const HomeEducationCarousel: React.FC<Props> = ({ cards }) => {
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const H_PADDING = 24; // 對應外層 px-6
  const CARD_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

  return (
    <View className="mt-6 px-6">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-chineseBold text-xl text-text-light dark:text-text-dark">
          衛教資訊
        </Text>
        <Pressable className="active:opacity-70">
          <Text className="font-englishRegular text-xs text-text-subtle-light dark:text-text-subtle-dark">
            查看更多
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {cards.map((card) => (
          <Pressable
            key={card.id}
            style={{ width: CARD_WIDTH }}
            className="mr-2 overflow-hidden rounded-3xl shadow-lg shadow-black/20 active:opacity-90"
          >
            <ImageBackground
              source={card.image}
              resizeMode="cover"
              className="h-44 w-full"
            >
              <View className="flex-1 justify-end bg-black/20 p-4">
                <View className="mb-2 self-start rounded-full bg-white/85 px-2 py-0.5">
                  <Text className="font-chineseRegular text-[10px] text-black">
                    {card.tag}
                  </Text>
                </View>

                <Text className="mb-1 font-chineseBold text-lg text-white">
                  {card.title}
                </Text>

                <Text className="font-chineseRegular text-xs text-white/90">
                  {card.desc}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};
