import { type Status, type Priority } from "~/lib/constants";

export interface Task {
  id: string;
  priority: Priority;
  status: Status;
  labels: string[];
  name: string;
  dueDate: Date;
  created: Date;
  assignee: string;
}