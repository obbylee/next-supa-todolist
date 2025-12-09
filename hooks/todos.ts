import { createTodo, fetchTodos } from "@/services/todos";
import { Todo } from "@/types/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodos() {
  return useQuery({ queryKey: ["todos"], queryFn: fetchTodos });
}

export function useTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Omit<Todo, "id">) => createTodo(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"], exact: true });
    },
  });
}
