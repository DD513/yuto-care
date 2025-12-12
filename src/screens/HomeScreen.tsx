import React from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const mockUser = {
  name: "王小玲",
  role: "護理師", // or "護理長"
  unit: "護理部 5C 病房",
  id: "N-10327",
};

const mockTodos = [
  {
    id: "1",
    patient: "陳ＯＯ",
    bed: "5C-12",
    type: "換藥與評估 - 3級",
    severity: "高優先",
    due: "今天 11:30 前",
  },
  {
    id: "2",
    patient: "林ＯＯ",
    bed: "5C-08",
    type: "皮瓣觀察",
    severity: "一般",
    due: "今天 15:00 前",
  },
];

// 區塊三：傷口評估模型（之後要擴充只要在這裡加就好）
const woundModels = [
  {
    id: "pressure",
    title: "壓傷評估模型",
    desc: "針對長期臥床病人，協助判讀壓瘡分期與嚴重度。",
    tag: "壓傷",
  },
  {
    id: "flap",
    title: "皮瓣存活偵測",
    desc: "偵測皮瓣顏色與溫度變化，早期發現缺血風險。",
    tag: "皮瓣",
  },
  {
    id: "burn",
    title: "燒燙傷分級",
    desc: "依傷口顏色與範圍提供分級與覆蓋建議。",
    tag: "燒燙傷",
  },
];

const educationCards = [
  {
    id: "pressure",
    title: "壓瘡預防衛教",
    desc: "教導家屬翻身頻率、減壓墊使用與皮膚觀察重點。",
    tag: "住院中",
    tone: "pink", // 壓瘡：粉色
    image: require("../../assets/images/education/pressure-education.jpg"),
  },
  {
    id: "dfu",
    title: "糖尿病足部照護",
    desc: "每天檢查足部、保持乾燥與保護足部，避免小傷口惡化。",
    tag: "慢病照護",
    tone: "orange", // 糖足：橘暖色
    image: require("../../assets/images/education/dfu-deucation.jpg"),
  },
  {
    id: "skin",
    title: "皮膚保濕與防摩擦",
    desc: "適度保濕、避免長時間摩擦與潮濕，維持皮膚屏障功能。",
    tag: "照護技巧",
    tone: "purple", // 一般皮膚照護：淡紫
    image: require("../../assets/images/education/skin-education.jpg"),
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "早安";
  if (hour < 17) return "午安";
  return "晚安";
}

export default function HomeScreen() {
  const greeting = getGreeting();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const H_PADDING = 24; // 跟外層 px-6 對應
  const CARD_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

  return (
    <SafeAreaView
      className="flex-1 bg-bg-light dark:bg-bg-dark"
      edges={["top"]} // ⭐ 只處理上方 safe area
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        className="flex-1"
      >
        {/* Header：只放 Logo / 品牌名稱，置中 */}
        <View className="items-center px-6 pt-6 pb-4">
          <Text className="font-englishTitle text-4xl font-semibold text-primary dark:text-primary-dark">
            Yuto
          </Text>
        </View>

        {/* 區塊一：使用者資訊（無白底卡片） */}
        <View className="px-6 pb-4">
          <View className="flex-row items-center justify-between">
            {/* 左邊：文字 */}
            <View className="flex-1 pr-3">
              <Text className="font-chineseBold mt-1 text-2xl text-text-light dark:text-text-dark">
                {greeting}，{mockUser.name}
              </Text>

              <Text className="font-chineseRegular mt-1 text-sm text-text-subtle-light dark:text-text-subtle-dark">
                {mockUser.role} · {mockUser.unit}
              </Text>

              {/* 有空間時才放員工編號 */}
              {/* {mockUser.id && (
                <Text className="font-englishRegular mt-0.5 text-xs text-text-subtle-light dark:text-text-subtle-dark">
                  Staff ID：{mockUser.id}
                </Text>
              )} */}
            </View>

            {/* 右邊：頭貼 */}
            <View className="h-11 w-11 items-center justify-center rounded-full bg-secondary/40 dark:bg-secondary/80">
              <Text className="font-chineseBold text-base text-text-light dark:text-text-dark">
                {mockUser.name[0]}
              </Text>
            </View>
          </View>
        </View>

        {/* 區塊二：待辦清單（單張卡片風格） */}
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
            {mockTodos.map((todo) => (
              <Pressable
                key={todo.id}
                className="rounded-3xl bg-surface-light dark:bg-surface-dark px-4 py-3 mb-2 shadow-sm shadow-black/5 active:opacity-95"
              >
                <View className="flex-row items-center">
                  {/* 左側：方形縮圖 */}
                  <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 dark:bg-primary-dark/60">
                    <Text className="font-chineseBold text-sm text-text-light dark:text-text-dark">
                      {todo.patient[0]}
                    </Text>
                  </View>

                  {/* 右側：文字區塊 */}
                  <View className="flex-1">
                    {/* 第一行：灰字說明 + 日期 */}
                    <Text className="font-chineseRegular text-[11px] text-text-subtle-light dark:text-text-subtle-dark">
                      {todo.due}
                    </Text>

                    {/* 第二行：病人 + 床號（主標） */}
                    <Text className="mt-1 font-chineseBold text-base text-text-light dark:text-text-dark">
                      {todo.patient}（{todo.bed}）
                    </Text>

                    {/* 第三行：類型 / 優先度 */}
                    <Text className="mt-1 font-chineseBold text-sm text-primary dark:text-primary-dark">
                      {todo.type}｜{todo.severity}
                    </Text>
                  </View>

                  {/* 右側箭頭 */}
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </View>
              </Pressable>
            ))}

            {mockTodos.length === 0 && (
              <View className="rounded-3xl border border-dashed border-border-light dark:border-border-dark px-4 py-3">
                <Text className="font-chineseRegular text-sm text-text-subtle-light dark:text-text-subtle-dark">
                  今天沒有急需處理的任務，可以好好喘口氣 ✨
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 區塊三：傷口評估模型 */}
        <View className="mt-6 px-6">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="font-chineseBold text-xl text-text-light dark:text-text-dark">
              傷口評估模型
            </Text>
            <Pressable className="active:opacity-70">
              <Text className="font-englishRegular text-xs text-text-subtle-light dark:text-text-subtle-dark">
                管理模型
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 24,
              paddingLeft: 8,
            }}
          >
            {woundModels.map((model) => (
              <Pressable
                key={model.id}
                className="mr-4 w-64 rounded-3xl bg-elevated-light dark:bg-elevated-dark px-4 py-6  shadow-black/10 active:opacity-90"
              >
                <View className="mb-2 flex-row items-center justify-between">
                  <View className="rounded-full bg-primary/15 px-2 py-0.5">
                    <Text className="font-englishRegular text-[10px] text-primary dark:text-primary-dark">
                      {model.tag}
                    </Text>
                  </View>
                  <Ionicons name="sparkles-outline" size={16} color="#FFD972" />
                </View>
                <Text className="font-chineseBold text-base text-text-light dark:text-text-dark">
                  {model.title}
                </Text>
                <Text className="font-chineseRegular mt-1 text-xs text-text-subtle-light dark:text-text-subtle-dark">
                  {model.desc}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* 區塊四：衛教資訊（全版輪播） */}
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
            pagingEnabled // ⭐ 一頁一頁翻
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              {
                // paddingRight: H_PADDING,
              }
            }
          >
            {educationCards.map((card) => (
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
                  {/* 半透明遮罩 + 文字 */}
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
      </ScrollView>
    </SafeAreaView>
  );
}
