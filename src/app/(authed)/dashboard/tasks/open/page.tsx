import { type Metadata } from "next";
import { columns } from "~/components/tasks/columns";
import { DataTable } from "~/components/tasks/data-table";
import { Status, tasks } from "~/lib/constants";
import { type Task } from "~/types";

export const metadata: Metadata = {
  title: "Open Tasks",
};

async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  return tasks.filter((task) => task.status === Status.Open);
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <main className="container mx-auto px-6 py-10 md:px-0">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
