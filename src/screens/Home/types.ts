export type UserRole = "護理師" | "護理長";

export type HomeUser = {
  name: string;
  role: UserRole;
  unit: string;
  id?: string; // 有才顯示
};

export type TodoSeverity = "高優先" | "一般";

export type HomeTodo = {
  id: string;
  patient: string;
  bed: string;
  type: string;
  severity: TodoSeverity;
  due: string;
};

export type WoundModel = {
  id: "pressure" | "flap" | "burn" | (string & {}); // 之後擴充可用 string
  title: string;
  desc: string;
  tag: "壓傷" | "皮瓣" | "燒燙傷" | (string & {});
};

export type EducationCard = {
  id: "pressure" | "dfu" | "skin" | (string & {});
  title: string;
  desc: string;
  tag: string;
  tone?: "pink" | "orange" | "purple" | (string & {});
  image: any; // RN require() 的型別最省事的寫法（穩）
};