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
  title?: string;
  lastTestRuns?: TestType[];
  status: string;
  loading?: boolean;
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
  lastTests?: any;
  status: string;
}

export interface PageConfig {
  matcher?: string[];
}

export interface BotAndSuiteModalType {
  id: React.Key | string;
  name?: string | JSX.Element;
  info: string;
  description: string;
  isNew?: boolean;
  isEdit?: boolean;
}

export interface EnvironmentModalType {
  id: React.Key | string;
  name: string | JSX.Element;
  url?: string | JSX.Element;
  isNew?: boolean;
  isEdit?: boolean;
  // description: string;
}
export interface TestRunType {
  status?: string;
}

export interface GlobalStateType {
  addBotRow: any;
  botLists: BotType[];
  setBotLists: React.Dispatch<React.SetStateAction<BotType[]>>;
  suiteModalData: BotAndSuiteModalType[];
  updateBotRow: any;
  deleteBotRow: any;
  setSuiteModalData: React.Dispatch<
    React.SetStateAction<BotAndSuiteModalType[]>
  >;
  suiteLists: SuiteType[];
  setSuiteLists: React.Dispatch<React.SetStateAction<SuiteType[]>>;
  environmentModalData?: EnvironmentModalType[];
  setEnvironmentModalData: React.Dispatch<
    React.SetStateAction<EnvironmentModalType[]>
  >;
  environmentLists: EnvironmentType[] | null; // Assuming environmentLists should hold EnvironmentType or null
  setEnvironmentLists: React.Dispatch<
    React.SetStateAction<EnvironmentType[] | null>
  >;
}
