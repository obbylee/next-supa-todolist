import { createClient } from "@/lib/supabase/client";
import { Todo } from "@/types/todos";

const supabase = createClient();

export async function fetchTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select()
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
}

export async function createTodo(values: Partial<Todo>) {
  if (values.id) {
    const { id, ...updateValues } = values;

    const { data, error } = await supabase
      .from("todos")
      .update(updateValues)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  const { data, error } = await supabase.from("todos").insert(values);

  if (error) {
    throw error;
  }
  return data;
}
