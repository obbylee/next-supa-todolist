import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const todos = [
  { id: 1, title: "Buy groceries", status: "In Progress", priority: "Medium" },
  { id: 2, title: "Finish Next.js tutorial", status: "Done", priority: "High" },
  { id: 3, title: "Walk the dog", status: "In Progress", priority: "Low" },
  { id: 4, title: "Clean room", status: "Done", priority: "Medium" },
  { id: 5, title: "Read a book", status: "In Progress", priority: "Low" },
  { id: 6, title: "Write blog post", status: "In Progress", priority: "High" },
  { id: 7, title: "Exercise", status: "Done", priority: "Medium" },
];

export default function Home() {
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

              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button variant="outline">Add</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Todo</DialogTitle>
                    </DialogHeader>
                    <form className="grid gap-4">
                      {/* Title */}
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" type="text" required />
                      </div>

                      {/* Status */}
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Priority */}
                      <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Todo</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </form>
              </Dialog>
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
                {todos.map((todo) => (
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
