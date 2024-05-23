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
  status?: string;
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

export interface TestStatus {
  name: string;
  data: number[];
  color: string;
}
export interface SuccessChartDataType {
  suite_id: string;
  suite_name: string;
  environment_id: string;
  environment_name: string;
  suite_run_ids: string[];
  suite_run_names: string[];
  timestamps: string[];
  evaluations_performed: number[];
  test_statuses: TestStatus[];
  evaluation_pass_rates: number[];
}

export interface BoxDataType {
  suite_run_id: string;
  suite_run_name: string;
  values: number[];
  outliers: any[];
}

export interface PerformanceChartDataType {
  boxes: BoxDataType[];
}

export interface UsageChartDataType {
  suite_id: string;
  suite_name: string;
  environment_id: string;
  environment_name: string;
  suite_run_ids: string[];
  suite_run_names: string[];
  evaluations_performed: number[];
  timestamps: string[];
  total_used: number;
  total_available: number;
  billing_tier: {
    name: string;
    price: number;
  };
}
