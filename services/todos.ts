import { createClient } from "@/lib/supabase/client";
import { Todo } from "@/types/todos";

const supabase = createClient();

export async function fetchTodos() {
  const { data, error } = await supabase.from("todos").select();

  if (error) {
    throw error;
  }
  return data;
}

export async function createTodo(values: Omit<Todo, "id">) {
  const { data, error } = await supabase.from("todos").insert(values);

  if (error) {
    throw error;
  }
  return data;
}
