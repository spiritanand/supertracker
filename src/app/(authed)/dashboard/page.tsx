import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | SuperTracker",
  description: "Overview of your tasks and productivity",
};

export default function page() {
  return (
    <main className="container mx-auto">
      <p className="my-5 text-center text-3xl">
        Select a task status to view your tasks
      </p>
    </main>
  );
}
