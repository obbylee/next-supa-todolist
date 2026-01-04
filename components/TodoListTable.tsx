"use client";

import { useDeleteTodo, useTodos } from "@/hooks/todos";
import DataTable from "./todos/data-table";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";
import { Todo } from "@/types/todos";

export default function TodoListTable() {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const { data: todos, isLoading, error } = useTodos();
  const deleteTodo = useDeleteTodo();

  function handleDeleteDialogOpen() {
    setDeleteOpen((prev) => !prev);
  }

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error loading todos.</div>;
  if (!todos || todos.length === 0) return <div>No todos found.</div>;

  return (
    <>
      <DataTable
        data={todos ?? []}
        toggleDeleteDialog={handleDeleteDialogOpen}
        onDeleteRow={(id: string) => deleteTodo.mutate(id)}
      />

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          // if (currentTodo) console.log("Delete", currentTodo.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}
