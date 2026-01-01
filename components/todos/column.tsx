"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Todo } from "@/types/todos";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import TodoFormDialog from "../todo-form-dialog";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant={status === "done" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const todo = row.original;

      const defaultValues = {
        id: String(todo.id),
        title: todo.title,
        status: todo.status,
        priority: todo.priority,
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(todo.id)}
            >
              Copy Task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <TodoFormDialog
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault(); // Prevent menu from closing before dialog opens
                  }}
                >
                  Update
                </DropdownMenuItem>
              }
              todo={defaultValues}
            />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
