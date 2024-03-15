import { CookieFunctions } from "./interface";

const CookieUtil: CookieFunctions = {
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("UpdateData");
    localStorage.removeItem("globalState");
    localStorage.removeItem("remotePartispant");
    localStorage.removeItem("localPartispant");
    localStorage.removeItem("room");
    localStorage.removeItem("redirect");
  },
};
