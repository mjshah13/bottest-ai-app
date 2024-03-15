export interface CookieFunctions {
  getCookie: (key: string) => string | null;
  setCookie: (key: string, value: string) => void;
  removeCookie: (key: string) => void;
  removeAllCookie: () => void;
}

export interface UserResource {
  id: string;
}

export interface Item {
  id: string;
  value: string;
  label: string;
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
    
  }
