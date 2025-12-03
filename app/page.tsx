import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createClient } from "@/lib/supabase/server";
import CreateTodoFormDialog from "@/components/CreateTodoFormDialog";

export default async function Home() {
  const supabase = await createClient();
  const { data: todos } = await supabase.from("todos").select();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-8 md:px-16 bg-white">
        <div className="w-full flex flex-col gap-6">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            TODO
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input type="text" placeholder="Search ..." />

              <CreateTodoFormDialog />
            </div>

            <Table>
              <TableCaption>A list of your todos.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos &&
                  todos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell className="font-medium">{todo.id}</TableCell>
                      <TableCell>{todo.title}</TableCell>
                      <TableCell>{todo.status}</TableCell>
                      <TableCell>{todo.priority}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
