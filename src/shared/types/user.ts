export type UserRole = "護理師" | "護理長";

export type HomeUser = {
  name: string;
  role: UserRole;
  unit: string;
  id?: string; // 有才顯示
  uri?: string;
};