"use client";

import { useDeleteTodo, useTodos } from "@/hooks/todos";
import DataTable from "./todos/data-table";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";
import { Todo } from "@/types/todos";

export default function TodoListTable() {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const { data: todos, isLoading, error } = useTodos();
  const deleteTodo = useDeleteTodo();

  function onDeleteClick(todo: Todo) {
    setCurrentTodo(todo);
    setDeleteOpen(true);
  }

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error loading todos.</div>;
  if (!todos || todos.length === 0) return <div>No todos found.</div>;

  return (
    <>
      <DataTable data={todos ?? []} onDeleteClick={onDeleteClick} />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setCurrentTodo(null);
        }}
        onConfirm={() => {
          if (!currentTodo) return;
          deleteTodo.mutate(currentTodo.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}
