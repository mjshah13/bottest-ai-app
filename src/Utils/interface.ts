export interface CookieFunctions {
  getCookie: (key: string) => string | null;
  setCookie: (key: string, value: string) => void;
  removeCookie: (key: string) => void;
  removeAllCookie: () => void;
}

export interface UserResource {
  id: string;
}

export interface Option {
  id: string;
  name: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

export interface ServiceItem {
  id: number;
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

export interface BottestReportProps {
  isDisabled?: boolean;
  title?: string;
  olderText?: string;
  lastRunText?: string;
  newerText?: string;
  progress?: string;
  progressResult?: string;
  svg?: React.ReactNode;
  statuses?: string[];
  testId: string;
  environmentId: string;
}

export interface BotType {
  id: string;
  name: string;
}

export interface SuiteType {
  id: string;
  name: string;
}
export interface EnvironmentType {
  id: string;
  name: string;
}
export interface TestType {
  [x: string]: any;
  created_at: string;
  created_by: string;
  full_run_enabled: boolean;
  id: string;
  iteration_count: number;
  last_updated_at: string;
  last_updated_by: string;
  success_criteria: string;
  suite_id: string;
  use_default_iteration_count: boolean;
  use_default_success_criteria: boolean;
}

export interface PageConfig {
  matcher?: string[];
}

// export interface TestData {
//   created_at: string;
//   status: string;
// }
