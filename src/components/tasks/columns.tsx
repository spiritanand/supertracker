"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge, type BadgeProps } from "~/components/ui/badge";
import { type Task } from "~/types";
import { format, isDate } from "date-fns";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Priority, Status } from "~/lib/constants";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");

      const badgeVariantMap: Record<Priority, BadgeProps["variant"]> = {
        [Priority.High]: "destructive",
        [Priority.Medium]: "info",
        [Priority.Low]: "secondary",
      } as const;

      if (typeof priority !== "string" || !(priority in badgeVariantMap)) {
        return null;
      }

      return (
        <Badge variant={badgeVariantMap[priority as Priority]}>
          {priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const created = row.getValue("created");
      return isDate(created) ? (
        <div>{format(created, "MMM d, yyyy")}</div>
      ) : (
        created
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate");
      return isDate(dueDate) ? (
        <div>{format(dueDate, "MMM d, yyyy")}</div>
      ) : (
        dueDate
      );
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.getValue("assignee");
      return typeof assignee === "string" ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{assignee.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p>{assignee}</p>
        </div>
      ) : (
        assignee
      );
    },
  },
  {
    accessorKey: "labels",
    header: "Labels",
    cell: ({ row }) => {
      const labels = row.getValue("labels");

      return Array.isArray(labels) ? (
        <div className="flex flex-wrap gap-2">
          {labels.map((label: string) => (
            <Badge variant="outline" key={label}>
              {label}
            </Badge>
          ))}
        </div>
      ) : (
        labels
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      const statusVariantMap: Record<Status, BadgeProps["variant"]> = {
        [Status.Open]: "warning",
        [Status.InProgress]: "success",
        [Status.Closed]: "destructive",
      } as const;

      if (typeof status !== "string" || !(status in statusVariantMap)) {
        return null;
      }

      return (
        <Badge variant={statusVariantMap[status as Status]}>{status}</Badge>
      );
    },
  },
];
