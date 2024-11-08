import { type Metadata } from "next";
import { columns } from "~/components/tasks/columns";
import { DataTable } from "~/components/tasks/data-table";
import { Status, tasks } from "~/lib/constants";
import { type Task } from "~/types";

export const metadata: Metadata = {
  title: "Closed Tasks",
};

async function getData(): Promise<Task[]> {
  // Simulate a slow API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return tasks.filter((task) => task.status === Status.Closed);
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <main className="container mx-auto px-6 py-10 md:px-0">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
