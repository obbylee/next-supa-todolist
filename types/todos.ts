export type Todo = {
  id: string;
  title: string;
  status: "progress" | "done";
  priority: "low" | "medium" | "high";
};
