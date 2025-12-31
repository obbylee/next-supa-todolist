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

export async function updateTodo(
  id: string,
  values: Partial<Omit<Todo, "id">>
) {
  const { data, error } = await supabase
    .from("todos")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Todo;
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
