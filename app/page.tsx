import TodoListTable from "@/components/TodoListTable";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-8 md:px-16 bg-white">
        <div className="w-full flex flex-col gap-6">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            TODO
          </h1>

          <TodoListTable />
        </div>
      </main>
    </div>
  );
}
