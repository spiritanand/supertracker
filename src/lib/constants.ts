import { type Task } from "~/types";

export enum Priority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}
export enum Status {
  Open = "Open",
  Closed = "Closed",
  InProgress = "In Progress",
}

export const tasks: Task[] = [
  {
    id: "T001",
    priority: Priority.High,
    status: Status.Open,
    labels: ["feature", "frontend"],
    name: "Implement login functionality",
    dueDate: new Date("2023-12-15"),
    created: new Date("2023-11-01"),
    assignee: "john@company.com",
    comments: [
      {
        id: "C001",
        content: "Initial design mockups reviewed and approved by the UX team",
        author: "jane@company.com",
        created: new Date("2023-11-02"),
      },
      {
        id: "C002",
        content:
          "Started implementation of OAuth flow with Google and GitHub providers",
        author: "john@company.com",
        created: new Date("2023-11-03"),
      },
      {
        id: "C003",
        content: "Need to add rate limiting to prevent brute force attacks",
        author: "bob@company.com",
        created: new Date("2023-11-04"),
      },
      {
        id: "C004",
        content: "Added password strength requirements and validation",
        author: "john@company.com",
        created: new Date("2023-11-05"),
      },
    ],
  },
  {
    id: "T002",
    priority: Priority.Medium,
    status: Status.Open,
    labels: ["bug", "backend"],
    name: "Fix API response caching issue",
    dueDate: new Date("2023-11-30"),
    created: new Date("2023-11-05"),
    assignee: "jane@company.com",
    comments: [
      {
        id: "C005",
        content:
          "Cache invalidation not working correctly for paginated responses",
        author: "jane@company.com",
        created: new Date("2023-11-05"),
      },
      {
        id: "C006",
        content: "Identified issue with Redis cache key generation",
        author: "tom@company.com",
        created: new Date("2023-11-06"),
      },
      {
        id: "C007",
        content: "Implemented new cache strategy using cache-control headers",
        author: "jane@company.com",
        created: new Date("2023-11-07"),
      },
      {
        id: "C008",
        content: "Added unit tests for cache middleware",
        author: "sarah@company.com",
        created: new Date("2023-11-08"),
      },
      {
        id: "C009",
        content: "Performance improved by 60% after fix",
        author: "tom@company.com",
        created: new Date("2023-11-09"),
      },
    ],
  },
  {
    id: "T003",
    priority: Priority.Low,
    status: Status.Open,
    labels: ["task", "devops"],
    name: "Set up automated deployment pipeline",
    dueDate: new Date("2023-12-31"),
    created: new Date("2023-11-10"),
    assignee: "bob@company.com",
    comments: [
      {
        id: "C010",
        content: "Created initial GitHub Actions workflow for CI",
        author: "bob@company.com",
        created: new Date("2023-11-10"),
      },
      {
        id: "C011",
        content: "Added AWS deployment configuration",
        author: "bob@company.com",
        created: new Date("2023-11-11"),
      },
      {
        id: "C012",
        content: "Need to add environment variable validation step",
        author: "jane@company.com",
        created: new Date("2023-11-12"),
      },
      {
        id: "C013",
        content: "Implemented Slack notifications for failed deployments",
        author: "bob@company.com",
        created: new Date("2023-11-13"),
      },
      {
        id: "C014",
        content: "Added database migration step to pipeline",
        author: "tom@company.com",
        created: new Date("2023-11-14"),
      },
    ],
  },
  {
    id: "T004",
    priority: Priority.High,
    status: Status.Open,
    labels: ["feature", "mobile"],
    name: "Implement push notifications",
    dueDate: new Date("2023-12-01"),
    created: new Date("2023-11-15"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T005",
    priority: Priority.Medium,
    status: Status.Open,
    labels: ["bug", "frontend"],
    name: "Fix layout issue on mobile devices",
    dueDate: new Date("2023-11-20"),
    created: new Date("2023-11-18"),
    assignee: "tom@company.com",
    comments: [],
  },
  {
    id: "T006",
    priority: Priority.Low,
    status: Status.Open,
    labels: ["task", "qa"],
    name: "Write end-to-end tests for checkout process",
    dueDate: new Date("2023-12-10"),
    created: new Date("2023-11-22"),
    assignee: "sarah@company.com",
    comments: [],
  },
  {
    id: "T007",
    priority: Priority.High,
    status: Status.InProgress,
    labels: ["feature", "frontend"],
    name: "Implement responsive design",
    dueDate: new Date("2023-11-30"),
    created: new Date("2023-10-15"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T008",
    priority: Priority.Medium,
    status: Status.InProgress,
    labels: ["bug", "backend"],
    name: "Debug database connection issues",
    dueDate: new Date("2023-12-01"),
    created: new Date("2023-10-20"),
    assignee: "tom@company.com",
    comments: [],
  },
  {
    id: "T009",
    priority: Priority.High,
    status: Status.InProgress,
    labels: ["feature", "mobile"],
    name: "Implement offline functionality",
    dueDate: new Date("2023-11-25"),
    created: new Date("2023-11-01"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T010",
    priority: Priority.Medium,
    status: Status.InProgress,
    labels: ["task", "devops"],
    name: "Set up monitoring and alerting",
    dueDate: new Date("2023-11-30"),
    created: new Date("2023-11-05"),
    assignee: "bob@company.com",
    comments: [],
  },
  {
    id: "T011",
    priority: Priority.Low,
    status: Status.InProgress,
    labels: ["task", "qa"],
    name: "Perform usability testing",
    dueDate: new Date("2023-12-05"),
    created: new Date("2023-11-12"),
    assignee: "sarah@company.com",
    comments: [],
  },
  {
    id: "T012",
    priority: Priority.High,
    status: Status.InProgress,
    labels: ["feature", "backend"],
    name: "Implement subscription management",
    dueDate: new Date("2023-12-15"),
    created: new Date("2023-11-08"),
    assignee: "jane@company.com",
    comments: [],
  },
  {
    id: "T013",
    priority: Priority.High,
    status: Status.Closed,
    labels: ["feature", "frontend"],
    name: "Implement user profile page",
    dueDate: new Date("2023-10-31"),
    created: new Date("2023-10-01"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T014",
    priority: Priority.Low,
    status: Status.Closed,
    labels: ["task", "devops"],
    name: "Set up monitoring and alerting",
    dueDate: new Date("2023-11-15"),
    created: new Date("2023-10-10"),
    assignee: "bob@company.com",
    comments: [],
  },
  {
    id: "T015",
    priority: Priority.Medium,
    status: Status.Closed,
    labels: ["bug", "backend"],
    name: "Fix API pagination issue",
    dueDate: new Date("2023-10-20"),
    created: new Date("2023-10-05"),
    assignee: "tom@company.com",
    comments: [],
  },
  {
    id: "T016",
    priority: Priority.High,
    status: Status.Closed,
    labels: ["feature", "mobile"],
    name: "Implement push notifications",
    dueDate: new Date("2023-10-25"),
    created: new Date("2023-10-01"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T017",
    priority: Priority.Medium,
    status: Status.Closed,
    labels: ["task", "qa"],
    name: "Write end-to-end tests for checkout process",
    dueDate: new Date("2023-11-01"),
    created: new Date("2023-10-15"),
    assignee: "sarah@company.com",
    comments: [],
  },
  {
    id: "T018",
    priority: Priority.Low,
    status: Status.Closed,
    labels: ["bug", "frontend"],
    name: "Fix layout issue on mobile devices",
    dueDate: new Date("2023-10-30"),
    created: new Date("2023-10-20"),
    assignee: "tom@company.com",
    comments: [],
  },
  {
    id: "T019",
    priority: Priority.Low,
    status: Status.Closed,
    labels: ["task", "documentation"],
    name: "Update API documentation",
    dueDate: new Date("2023-12-20"),
    created: new Date("2023-12-01"),
    assignee: "mike@company.com",
    comments: [],
  },
  {
    id: "T020",
    priority: Priority.High,
    status: Status.Open,
    labels: ["feature", "api"],
    name: "Implement GraphQL API",
    dueDate: new Date("2024-01-15"),
    created: new Date("2023-12-01"),
    assignee: "john@company.com",
    comments: [],
  },
  {
    id: "T021",
    priority: Priority.Medium,
    status: Status.Open,
    labels: ["task", "testing"],
    name: "Set up integration testing environment",
    dueDate: new Date("2024-01-31"),
    created: new Date("2023-12-05"),
    assignee: "sarah@company.com",
    comments: [],
  },
  {
    id: "T022",
    priority: Priority.Low,
    status: Status.Open,
    labels: ["bug", "ui"],
    name: "Fix accessibility issues on forms",
    dueDate: new Date("2024-02-15"),
    created: new Date("2023-12-10"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T023",
    priority: Priority.High,
    status: Status.InProgress,
    labels: ["feature", "api"],
    name: "Implement real-time updates with WebSockets",
    dueDate: new Date("2024-01-31"),
    created: new Date("2023-12-01"),
    assignee: "tom@company.com",
    comments: [],
  },
  {
    id: "T024",
    priority: Priority.Medium,
    status: Status.InProgress,
    labels: ["task", "devops"],
    name: "Migrate to Kubernetes",
    dueDate: new Date("2024-03-01"),
    created: new Date("2023-12-15"),
    assignee: "bob@company.com",
    comments: [],
  },
  {
    id: "T025",
    priority: Priority.Low,
    status: Status.Closed,
    labels: ["bug", "ui"],
    name: "Fix typo in footer copyright notice",
    dueDate: new Date("2023-12-31"),
    created: new Date("2023-12-20"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T026",
    priority: Priority.High,
    status: Status.Open,
    labels: ["feature", "analytics"],
    name: "Implement user behavior tracking",
    dueDate: new Date("2024-02-28"),
    created: new Date("2024-01-05"),
    assignee: "jane@company.com",
    comments: [],
  },
  {
    id: "T027",
    priority: Priority.Medium,
    status: Status.Open,
    labels: ["task", "performance"],
    name: "Optimize database queries",
    dueDate: new Date("2024-03-15"),
    created: new Date("2024-01-10"),
    assignee: "tom@company.com",
    comments: [],
  },
  {
    id: "T028",
    priority: Priority.Low,
    status: Status.Open,
    labels: ["bug", "ui"],
    name: "Fix inconsistent button styles",
    dueDate: new Date("2024-03-31"),
    created: new Date("2024-01-15"),
    assignee: "alice@company.com",
    comments: [],
  },
  {
    id: "T029",
    priority: Priority.High,
    status: Status.InProgress,
    labels: ["feature", "api"],
    name: "Implement server-side rendering",
    dueDate: new Date("2024-02-15"),
    created: new Date("2024-01-01"),
    assignee: "john@company.com",
    comments: [],
  },
  {
    id: "T030",
    priority: Priority.Medium,
    status: Status.InProgress,
    labels: ["task", "testing"],
    name: "Increase unit test coverage to 80%",
    dueDate: new Date("2024-03-01"),
    created: new Date("2024-01-10"),
    assignee: "sarah@company.com",
    comments: [],
  },
  {
    id: "T031",
    priority: Priority.High,
    status: Status.Closed,
    labels: ["bug", "security"],
    name: "Fix XSS vulnerability in search",
    dueDate: new Date("2024-01-15"),
    created: new Date("2024-01-05"),
    assignee: "jane@company.com",
    comments: [],
  },
  {
    id: "T032",
    priority: Priority.Medium,
    status: Status.Closed,
    labels: ["task", "refactor"],
    name: "Refactor legacy code in user profile",
    dueDate: new Date("2024-01-31"),
    created: new Date("2024-01-10"),
    assignee: "mike@company.com",
    comments: [],
  },
];
