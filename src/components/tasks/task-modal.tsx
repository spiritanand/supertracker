"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import { type Comment, type Task } from "~/types";
import { Status } from "~/lib/constants";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { SendHorizontal } from "lucide-react";

interface TaskModalProps {
  task: Task | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onStatusChange: (taskId: string, newStatus: Status) => Promise<void>;
  onAddComment: (taskId: string, comment: Comment) => Promise<void>;
  table: Table<Task>;
  setSelectedTask: (task: Task) => void;
}

export function TaskModal({
  task,
  isModalOpen,
  setIsModalOpen,
  onStatusChange,
  onAddComment,
  table,
  setSelectedTask,
}: TaskModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Status | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = useCallback(async () => {
    if (pendingStatus && task) {
      await onStatusChange(task.id, pendingStatus);
      setIsConfirmOpen(false);
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
  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      const rows = table.getRowModel().rows;
      const currentIndex = rows.findIndex(
        (row) => row.original.id === task?.id,
      );
      const nextIndex = (currentIndex + direction + rows.length) % rows.length; // to handle negative indices or indices greater than the length of the array. keeps the index in bounds.
      const nextTask = rows[nextIndex]?.original;
      if (nextTask) {
        rows[nextIndex]?.toggleSelected(true);
        setSelectedTask(nextTask);
      }
    },
    [table, task, setSelectedTask],
  );

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !task) return;

    await onAddComment(task.id, {
      id: Math.random().toString(36).substring(2, 15), //TODO: replace with cuid or some ID generator
      author: "you@company.com", // can be replaced with user info from session
      content: newComment,
      created: new Date(),
    });
    setNewComment("");

    // Use ref to blur
    // It is unlikely for the user to add 2 comments in a row without interacting with the modal, so we can blur the input.
    commentInputRef.current?.blur();
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Handle input focus/blur with keyboard
      if (e.key === "c" && !isInputFocused && !isConfirmOpen) {
        e.preventDefault();
        commentInputRef.current?.focus();
        return;
      }

      // Return early if input is focused or modal is closed
      if (!isModalOpen || !task || isInputFocused) return;

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
        console.log("arrow key pressed");
        handleNavigate(e.key === "ArrowLeft" ? -1 : 1);
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
    isInputFocused,
    handleNavigate,
  ]);

  if (!task) return null;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90svh] md:max-w-screen-sm lg:max-w-screen-md">
          <span
            onClick={() => handleNavigate(-1)}
            className="absolute -left-10 top-1/2 flex -translate-y-1/2 cursor-pointer justify-between rounded-full border-2 p-2 hover:bg-muted"
          >
            <ChevronLeftIcon className="h-4 w-4" aria-label="Previous task" />
          </span>

          <span
            onClick={() => handleNavigate(1)}
            className="absolute -right-10 top-1/2 flex -translate-y-1/2 cursor-pointer justify-between rounded-full border-2 p-2 hover:bg-muted"
          >
            <ChevronRightIcon className="h-4 w-4" aria-label="Next task" />
          </span>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{task.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col gap-4">
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Status:</p>
                    <Select
                      value={task.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="w-[180px]" tabIndex={-1}>
                        <SelectValue>
                          <Badge
                            variant={
                              task.status === Status.Open
                                ? "default"
                                : "success"
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
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">Priority:</p>
                  {/* TODO: Add priority color */}
                  <Badge className="ml-4 text-sm" variant="secondary">
                    {task.priority}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <p className="text-sm font-semibold">Assignee:</p>
                  <span className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {task.assignee.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{task.assignee}</p>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">Due Date:</p>
                  <p className="ml-4 text-sm">
                    {format(task.dueDate, "MMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">Created:</p>
                  <p className="ml-4 text-sm">
                    {format(task.created, "MMM d, yyyy")}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">Labels:</p>
                  <p className="ml-4 text-sm">
                    {task.labels.map((label) => (
                      <Badge variant="outline" key={label}>
                        {label}
                      </Badge>
                    ))}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="mb-4 text-sm font-semibold">Comments</h4>
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    {task.comments?.length ? (
                      task.comments
                        .sort(
                          (a, b) => b.created.getTime() - a.created.getTime(),
                        )
                        .map((comment) => (
                          <div key={comment.id} className="mb-4 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {comment.author.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-xs font-medium">
                                {comment.author}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(
                                  comment.created,
                                  "MMM d, yyyy 'at' h:mm a",
                                )}
                              </p>
                            </div>
                            <p className="mt-2 text-sm">{comment.content}</p>
                          </div>
                        ))
                    ) : (
                      <p className="text-center text-sm text-muted-foreground">
                        No comments yet
                      </p>
                    )}
                  </ScrollArea>

                  <form onSubmit={handleAddComment} className="mt-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Input
                          ref={commentInputRef}
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNewComment(e.target.value)
                          }
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          className="flex-1"
                          tabIndex={-1}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!newComment.trim()}
                          onClick={() => setIsInputFocused(false)}
                        >
                          <SendHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Press &apos;c&apos; to focus comment box
                      </p>
                    </div>
                  </form>
                </div>
              </div>
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
