"use client";

import { useDeleteTodo, useTodos } from "@/hooks/todos";
import DataTable from "./todos/data-table";

export default function TodoListTable() {
  const { data: todos, isLoading, error } = useTodos();
  const deleteTodo = useDeleteTodo();

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error loading todos.</div>;
  if (!todos || todos.length === 0) return <div>No todos found.</div>;

  return (
    <DataTable
      data={todos ?? []}
      onDeleteRow={(id: string) => deleteTodo.mutate(id)}
    />
  );
}
