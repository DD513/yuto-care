import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { mockUser, mockTodos, woundModels, educationCards } from "./mock";

import { HomeHeader } from "./components/HomeHeader";
import { HomeUserIntro } from "./components/HomeUserIntro";
import { HomeTodoSection } from "./components/HomeTodoSection";
import { HomeWoundModelsSection } from "./components/HomeWoundModelsSection";
import { HomeEducationCarousel } from "./components/HomeEducationCarousel";

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-bg-light dark:bg-bg-dark"
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        className="flex-1"
      >
        <HomeHeader />
        <HomeUserIntro user={mockUser} />
        <HomeTodoSection todos={mockTodos} />
        <HomeWoundModelsSection models={woundModels} />
        <HomeEducationCarousel cards={educationCards} />
      </ScrollView>
    </SafeAreaView>
  );
}
