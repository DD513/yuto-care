import type { HomeUser } from "@/shared/types/user";

export const mockUser: HomeUser = {
  id: "N-10327",
  name: "王小玲",
  role: "護理師",
  unit: "護理部 5C 病房",
} as const;