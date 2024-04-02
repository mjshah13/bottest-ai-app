import { filter } from "lodash";
import { TestType } from "./typesInterface";

export const ROOT_API_URL = `https://kkhcslhnef.execute-api.us-east-1.amazonaws.com/`;

export const filterOptions = [
  {
    key: 1,
    label: "View all",
    status: "View all",
    include: false,
  },
  {
    key: 2,
    label: "Failed",
    status: "Fail",
    include: true,
  },
  {
    key: 3,
    label: "Passed",
    status: "Pass",
    include: true,
  },
  {
    key: 4,
    label: "Mixed",
    status: "Mixed",
    include: true,
  },
  {
    key: 5,
    label: "Running",
    status: "Running",
    include: true,
  },
  {
    key: 6,
    label: "Stopped",
    status: "Stopped",
    include: true,
  },
  {
    key: 7,
    label: "Skipped",
    status: "Skipped",
    include: true,
  },
  {
    key: 1,
    label: "Error",
    status: "Error",
    include: true,
  },
];

export const getStatuses = filterOptions
  ?.filter((status) => status?.include)
  ?.map((status) => status?.status);
