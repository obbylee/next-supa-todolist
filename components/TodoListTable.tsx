"use client";

import { useDeleteTodo, useTodos } from "@/hooks/todos";
import DataTable from "./todos/data-table";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";
import { Todo } from "@/types/todos";
import TodoFormDialog from "./todo-form-dialog";

export default function TodoListTable() {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [updateTodo, setUpdateTodo] = useState<Todo | null>(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [openTodoForm, setOpenTodoForm] = useState(false);
  const { data: todos, isLoading, error } = useTodos();
  const deleteTodo = useDeleteTodo();

  function onAddClick() {
    setOpenTodoForm(true);
  }

  function onDeleteClick(todo: Todo) {
    setCurrentTodo(todo);
    setDeleteOpen(true);
  }

  function onUpdateClick(todo: Todo) {
    setUpdateTodo(todo);
    setOpenTodoForm(true);
  }

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error loading todos.</div>;
  if (!todos || todos.length === 0) return <div>No todos found.</div>;

  return (
    <>
      <DataTable
        data={todos ?? []}
        onAddClick={onAddClick}
        onDeleteClick={onDeleteClick}
        onUpdateClick={onUpdateClick}
      />

      <TodoFormDialog
        open={openTodoForm}
        onOpenChange={setOpenTodoForm}
        key={updateTodo?.id ?? "new-todo"}
        todo={updateTodo}
      />

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
