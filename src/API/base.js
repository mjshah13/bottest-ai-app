import axios from "axios";
import { ROOT_API_URL } from "../Utils/Common";
import { getCookie } from "../Utils/StorageVariables";

const onError = async (error) => {
  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx

    if (error.response.status === 403) {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};
const request = async (options, isAuth, isMultipart) => {
  let baseURL = ROOT_API_URL;
  const token = getCookie("clerk-db-jwt");

  

  let headers = {};

  if (isAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isMultipart) {
    headers["Content-Type"] = "multipart/form-data";
  }
  const client = axios.create({
    baseURL,
    headers: { ...headers },
  });

  client.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  return client(options).catch(onError);
};

export class BaseService {
  static get = (url, isAuth = true, isMultipart = false) => {
    return request(
      {
        url,
        method: "GET",
      },
      isAuth,
      isMultipart
    );
  };

  static post = (url, data, isAuth = true, isMultipart = false) => {
    return request(
      {
        url,
        method: "POST",
        data,
      },
      isAuth,
      isMultipart
    );
  };

  static put = (url, data, isAuth = true, isMultipart = false) => {
    return request(
      {
        url,
        method: "PUT",
        data,
      },
      isAuth,
      isMultipart
    );
  };
  static patch = (url, data, isAuth = true, isMultipart = false) => {
    return request(
      {
        url,
        method: "PATCH",
        data,
      },
      isAuth,
      isMultipart
    );
  };
  static remove = (url, isAuth = true, isMultipart = false) => {
    return request(
      {
        url,
        method: "DELETE",
      },
      isAuth,
      isMultipart
    );
  };
}
