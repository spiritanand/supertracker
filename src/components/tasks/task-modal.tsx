"use client";

import { useState, useEffect, useCallback } from "react";
import { type Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { type Task } from "~/types";
import { Status } from "~/lib/constants";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface TaskModalProps {
  task: Task | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onStatusChange: (taskId: string, newStatus: Status) => Promise<void>;
  table: Table<Task>;
  setSelectedTask: (task: Task) => void;
}

export function TaskModal({
  task,
  isModalOpen,
  setIsModalOpen,
  onStatusChange,
  table,
  setSelectedTask,
}: TaskModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Status | null>(null);

  const handleConfirm = useCallback(async () => {
    if (pendingStatus && task) {
      await onStatusChange(task.id, pendingStatus);
      setIsConfirmOpen(false);
      //   setIsModalOpen(false);
    }
  }, [pendingStatus, task, onStatusChange, setIsConfirmOpen]);

  const handleStatusChange = async (newStatus: Status) => {
    setPendingStatus(newStatus);
    // delay to flush the key press event
    setTimeout(() => {
      setIsConfirmOpen(true);
    }, 0);
  };

  // Navigate to the next or previous task
  const handleNavigate = (direction: -1 | 1) => {
    const rows = table.getRowModel().rows;
    const currentIndex = rows.findIndex((row) => row.original.id === task?.id);
    const nextIndex = (currentIndex + direction + rows.length) % rows.length; // to handle negative indices or indices greater than the length of the array. keeps the index in bounds.
    const nextTask = rows[nextIndex]?.original;
    if (nextTask) {
      rows[nextIndex]?.toggleSelected(true);
      setSelectedTask(nextTask);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (!isModalOpen || !task) return;

      // Handle alert dialog keyboard shortcuts
      if (isConfirmOpen) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (pendingStatus) await handleConfirm();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setIsConfirmOpen(false);
        }
        return;
      }

      // Handle modal keyboard shortcuts
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const direction = e.key === "ArrowLeft" ? -1 : 1;
        const rows = table.getRowModel().rows;
        const currentIndex = rows.findIndex(
          (row) => row.original.id === task.id,
        );
        const nextIndex =
          (currentIndex + direction + rows.length) % rows.length;
        const nextTask = rows[nextIndex]?.original;

        if (nextTask) {
          rows[nextIndex]?.toggleSelected(true);
          setSelectedTask(nextTask);
        }
      }

      // Handle status change
      if (e.key === "1" || e.key === "2" || e.key === "3") {
        e.preventDefault();
        const statusMap = {
          "1": Status.Open,
          "2": Status.InProgress,
          "3": Status.Closed,
        };

        const newStatus = statusMap[e.key];
        if (newStatus !== task.status) void handleStatusChange(newStatus);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isModalOpen,
    isConfirmOpen,
    task,
    table,
    setSelectedTask,
    pendingStatus,
    handleConfirm,
  ]);

  if (!task) return null;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="md:max-w-sm lg:max-w-md">
          <span className="absolute -left-10 top-1/2 flex -translate-y-1/2 cursor-pointer justify-between rounded-full border-2 p-2 hover:bg-muted">
            <ChevronLeftIcon
              className="h-4 w-4"
              onClick={() => handleNavigate(-1)}
              aria-label="Previous task"
            />
          </span>

          <span className="absolute -right-10 top-1/2 flex -translate-y-1/2 cursor-pointer justify-between rounded-full border-2 p-2 hover:bg-muted">
            <ChevronRightIcon
              className="h-4 w-4"
              onClick={() => handleNavigate(1)}
              aria-label="Next task"
            />
          </span>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{task.name}</DialogTitle>
            <DialogDescription className="flex flex-col gap-4">
              <span className="mt-4">
                <span className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Status:</span>
                  <Select
                    value={task.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue>
                        <Badge
                          variant={
                            task.status === Status.Open ? "default" : "success"
                          }
                        >
                          {task.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Status.Open}>Open</SelectItem>
                      <SelectItem value={Status.InProgress}>
                        In Progress
                      </SelectItem>
                      <SelectItem value={Status.Closed}>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
              </span>
              <span>
                <span className="text-sm font-semibold">Priority:</span>
                {/* TODO: Add priority color */}
                <Badge className="ml-4 text-sm" variant="secondary">
                  {task.priority}
                </Badge>
              </span>
              <span className="mt-2 flex items-center gap-4">
                <span className="text-sm font-semibold">Assignee:</span>
                <span className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {task.assignee.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.assignee}</span>
                </span>
              </span>
              <span className="mt-2">
                <span className="text-sm font-semibold">Due Date:</span>
                <span className="ml-4 text-sm">
                  {format(task.dueDate, "MMM d, yyyy")}
                </span>
              </span>
              <span className="mt-2">
                <span className="text-sm font-semibold">Created:</span>
                <span className="ml-4 text-sm">
                  {format(task.created, "MMM d, yyyy")}
                </span>
              </span>

              <span>
                <span className="text-sm font-semibold">Labels:</span>
                <span className="ml-4 text-sm">
                  {task.labels.map((label) => (
                    <Badge variant="outline" key={label}>
                      {label}
                    </Badge>
                  ))}
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Task Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status of &quot;{task.name}
              &quot; to &quot;{pendingStatus}?
              <br />
              <span className="text-xs text-primary">
                Press Enter to confirm or Escape to cancel.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Proceed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
