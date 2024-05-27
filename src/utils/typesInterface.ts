import { ReactNode } from "react";

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
  id: string | null;
  name: string | null;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: JSX.Element;
  current: boolean;
  isDisabled?: boolean;
}

export interface ServiceItem {
  id: number;
  name: string;
  href: string;
  icon: JSX.Element;
  current: boolean;
  isDisabled?: boolean;
}

export interface BottestReportProps {
  isDisabled?: boolean;
  lastTestRuns?: TestType[];
  loading?: boolean;
  specificTest: TestType;
}

export interface BotType {
  id: string;
  name: string;
  isEdit?: boolean;
  isNew?: boolean;
  isDelete?: boolean;
  isDuplicate?: boolean;
}

export interface SuiteType {
  id: string;
  name: string;
  isEdit?: boolean;
  isNew?: boolean;
  isDuplicate?: boolean;
  isDelete?: boolean;
  default_success_criteria?: string;
  default_variant_count?: number;
  default_iteration_count?: number;
}
export interface EnvironmentType {
  [x: string]: any;
  id: string;
  name: string;
  info?: string;
  isEdit?: boolean;
  isNew?: boolean;
  isDelete?: boolean;
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
  lastTests?: any;
  status: string;
}

export interface PageConfig {
  matcher?: string[];
}

export interface TestRunType {
  environment_id: ReactNode;
  id: ReactNode;
  created_by: ReactNode;
  completed_at: ReactNode | string;
  status?: string;
  suite_run_id: string;
  initiation_type?: string;
}

export interface Conversation {
  id?: string;
  created_at?: string;
  created_by?: string;
  html_blob?: string;
  last_updated_at?: string;
  last_updated_by?: string;
}

export interface BaselineType {
  id: string;
  name: string;
  conversation_json?: Conversation[];
  test_id: string;
}

export interface GlobalStateType {
  addBotRow: any;
  botLists: BotType[];
  setBotLists: React.Dispatch<React.SetStateAction<BotType[]>>;
  updateBotRow: any;
  deleteBotRow: any;
  suiteLists: SuiteType[];
  setSuiteLists: React.Dispatch<React.SetStateAction<SuiteType[]>>;
  updateSuiteRow: any;
  deleteSuiteRow: any;
  addSuiteRow: any;
  environmentLists: EnvironmentType[];
  setEnvironmentLists: React.Dispatch<React.SetStateAction<EnvironmentType[]>>;
  updateEnvironmentRow: any;
  addEnvironmentRow: any;
  deleteEnvironmentRow: any;
  copyBot: any;
  copySuite: any;
  baselines: BaselineType[];
  setBaselines: React.Dispatch<React.SetStateAction<BaselineType[]>>;
  deleteBaselineData: any;
  addNewBaseline: any;
  testData: TestType[] | null;
  setTestData: React.Dispatch<React.SetStateAction<TestType[] | null>>;
  deleteTestRuns: any;
  updateTestdata: any;
}

export interface TestRuns {
  status: string;
  id: string;
  evaluations: any[];
}

export interface CustomizeTestData {
  success_criteria: string;
  variant_count: number;
  iteration_count: number;
  full_run_enabled: boolean;
}

export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface EvaluationType {
  id: string;
}

export interface AnalyticsReportType {
  suite_run_id: string;
  suite_run_timestamp: string;
  comparison_run_id: string;
  comparison_run_timestamp: string;
  suite_name: string;
  tests: Test[];
  overview: OverviewData;
  improvements: {
    test_improvements: {
      test_id: string;
      test_name: string;
      pass_rate: number;
      comparison_pass_rate: number;
    }[];
  };
  failures: {
    test_failures: {
      test_id: string;
      test_name: string;
      pass_rate: number;
      failure_summary: string;
      test_run_id: string;
    }[];
  };
  performance: {
    average_run_time: number;
    comparison_average_run_time: number;
    improvement_rate: number;
    buckets: string[];
    values: number[];
    comparison_values: number[];
    test_performances: {
      test_id: string;
      test_name: string;
      average_run_time: number;
      comparison_average_run_time: number;
      percent_slower: number;
      min_run_time: number;
      max_run_time: number;
    }[];
  };
}

interface Test {
  test_id: string;
  test_name: string;
  use_default_success_criteria: boolean;
  baseline_count: number;
  variant_count: number;
  iteration_count: number;
  evaluation_count: number;
}

interface OverviewData {
  total_test_count: number;
  total_variant_count: number;
  total_evaluation_count: number;
  test_pass_rate?: number | undefined;
  comparison_test_pass_rate: number;
  delta_test_pass_rate: number;
  evaluation_pass_rate: number;
  comparison_evaluation_pass_rate: number;
  delta_evaluation_pass_rate: number;
  run_statuses: string[];
  test_status_counts: number[];
  comparison_test_status_counts: number[];
  evaluation_status_counts: number[];
  comparison_evaluation_status_counts: number[];
}