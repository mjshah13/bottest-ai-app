import { CookieFunctions } from "./typesInterface";

export const CookieUtil: CookieFunctions = {
  getCookie: (key) => {
    return localStorage.getItem(key);
  },
  setCookie: (key, value) => {
    return localStorage.setItem(key, value);
  },
  removeCookie: (key) => {
    return localStorage.removeItem(key);
  },
  removeAllCookie: () => {
    // localStorage.removeItem("accessToken");
    localStorage.removeItem("selectedBot");
    localStorage.removeItem("selectedSuite");
    localStorage.removeItem("selectedEnvironment");
  },
};
