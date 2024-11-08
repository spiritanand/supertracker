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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "~/components/ui/dialog";

interface DataTableProps {
  columns: ColumnDef<Task>[];
  data: Task[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
    getRowId: (row) => row.id,
  });

  const handleRowAction = useCallback((row: Task) => {
    setSelectedTask(row);
    setIsModalOpen(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const rows = table.getRowModel().rows;
      const selectedRow = table.getSelectedRowModel().rows[0];
      const currentIndex = selectedRow
        ? rows.findIndex((row) => row.id === selectedRow.id)
        : -1;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = currentIndex < rows.length - 1 ? currentIndex + 1 : 0;
        rows[nextIndex]?.toggleSelected(true);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : rows.length - 1;
        rows[prevIndex]?.toggleSelected(true);
      }

      if (event.key === "Enter" && selectedRow) {
        event.preventDefault();
        handleRowAction(selectedRow.original);
      }
    },
    [table, handleRowAction],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask?.name}</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
