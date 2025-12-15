import type { EducationCard, HomeTodo, HomeUser, WoundModel } from "./types";

export const mockUser: HomeUser = {
  name: "王小玲",
  role: "護理師",
  unit: "護理部 5C 病房",
  id: "N-10327",
};

export const mockTodos: HomeTodo[] = [
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

export const woundModels: WoundModel[] = [
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

export const educationCards: EducationCard[] = [
  {
    id: "pressure",
    title: "壓瘡預防衛教",
    desc: "教導家屬翻身頻率、減壓墊使用與皮膚觀察重點。",
    tag: "住院中",
    tone: "pink",
    image: require("../../../assets/images/education/pressure-education.jpg"),
  },
  {
    id: "dfu",
    title: "糖尿病足部照護",
    desc: "每天檢查足部、保持乾燥與保護足部，避免小傷口惡化。",
    tag: "慢病照護",
    tone: "orange",
    image: require("../../../assets/images/education/dfu-deucation.jpg"),
  },
  {
    id: "skin",
    title: "皮膚保濕與防摩擦",
    desc: "適度保濕、避免長時間摩擦與潮濕，維持皮膚屏障功能。",
    tag: "照護技巧",
    tone: "purple",
    image: require("../../../assets/images/education/skin-education.jpg"),
  },
];