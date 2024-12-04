export type Toast = {
  title: string;
  description: string;
  type: "success" | "error" | "warning" | "info" | "loading";
  duration: number;
};
