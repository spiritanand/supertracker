"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type Task } from "~/types";
import { TaskModal } from "./task-modal";
import { type Status } from "~/lib/constants";

interface DataTableProps {
  columns: ColumnDef<Task>[];
  data: Task[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [localData, setLocalData] = useState(data);

  const table = useReactTable({
    data: localData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
    getRowId: (row) => row.id,
  });

  // console.log({ selectedRow: table.getSelectedRowModel().rows[0] });

  const handleRowAction = useCallback((row: Task) => {
    setSelectedTask(row);
    setIsModalOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isModalOpen) return;

      const rows = table.getRowModel().rows;
      const selectedRow = table.getSelectedRowModel().rows[0];
      const currentIndex = selectedRow
        ? rows.findIndex((row) => row.id === selectedRow.id)
        : -1;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % rows.length;
        rows[nextIndex]?.toggleSelected(true);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + rows.length) % rows.length;
        rows[prevIndex]?.toggleSelected(true);
      }

      if (event.key === "Enter" && selectedRow) {
        event.preventDefault();
        handleRowAction(selectedRow.original);
      }
    },
    [table, handleRowAction, isModalOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleStatusChange = async (taskId: string, newStatus: Status) => {
    // Find current index before removing the task
    const currentIndex = localData.findIndex((task) => task.id === taskId);

    // Remove the task from local data using slice
    const updatedData = [
      ...localData.slice(0, currentIndex),
      ...localData.slice(currentIndex + 1),
    ];

    // Set the next task in focus
    if (updatedData.length > 0) {
      const rows = table.getRowModel().rows;
      // modulo to wrap around to beginning if needed
      rows[(currentIndex + 1) % updatedData.length]?.toggleSelected(true);
    } else {
      setSelectedTask(null);
      setIsModalOpen(false);
    }

    setLocalData(updatedData);

    // TODO: Implement API call to update task status
    console.log("Updating task status:", taskId, newStatus);
  };

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    row.toggleSelected(!row.getIsSelected());
                    handleRowAction(row.original);
                  }}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TaskModal
        task={selectedTask}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onStatusChange={handleStatusChange}
        table={table}
        setSelectedTask={setSelectedTask}
      />
    </>
  );
}
