import { TestType } from "./typesInterface";

export const ROOT_API_URL = `https://kkhcslhnef.execute-api.us-east-1.amazonaws.com/`;

export const filterOptions = [
  {
    key: 1,
    label: "View all",
    status: "View all",
  },
  {
    key: 2,
    label: "Failed",
    status: "Fail",
  },
  {
    key: 3,
    label: "Passed",
    status: "Pass",
  },
  {
    key: 4,
    label: "Mixed",
    status: "Mixed",
  },
  {
    key: 5,
    label: "Running",
    status: "Running",
  },
  {
    key: 6,
    label: "Stopped",
    status: "Stopped",
  },
  {
    key: 7,
    label: "Skipped",
    status: "Skipped",
  },
  {
    key: 1,
    label: "Error",
    status: "Error",
  },
];

export const teststatus: { [key: string]: string } = {
  Pass: "passed",
  Fail: "failed",
  Skipped: "skipped",
  Mixed: "mixed",
  Stopped: "stopped",
  Running: "running",
};
