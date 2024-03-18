// useApi.ts

import { ROOT_API_URL } from "@/utils/Common";
import { useSession } from "@clerk/nextjs";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { useState, useCallback } from "react";

type UseApiOptions = {
  isAuth?: boolean;
  isMultipart?: boolean;
};

export const useApi = () => {
  // State to keep track of API requests
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const { session } = useSession();

  const getSessionToken = async () => {
    // Check if the session exists before calling getToken
    if (!session) {
      console.error("The session is not available");
      return null;
    }

    return session.getToken();
  };

  // Function to make the API request
  const request = useCallback(
    async (
      options: AxiosRequestConfig,
      { isAuth = true, isMultipart = false }: UseApiOptions = {}
    ) => {
      setLoading(true);
      setError(null);

      let headers: Record<string, string> = {};

      if (isAuth) {
        const token = await getSessionToken();
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (isMultipart) {
        headers["Content-Type"] = "multipart/form-data";
      }

      const client = axios.create({
        baseURL: ROOT_API_URL,
        headers,
      });

      client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

      try {
        const response = await client(options);
        setLoading(false);
        return response.data;
      } catch (error) {
        setLoading(false);

        if (axios.isAxiosError(error)) {
          // Handle AxiosError
          setError(error);
        } else if (error instanceof Error) {
          // Handle generic Error
          setError(error);
        } else {
          // Handle cases where the caught value isn't an Error object
          setError(new Error("An unknown error occurred"));
        }

        throw error;
      }
    },
    [session]
  );

  return {
    loading,
    error,
    request,
  };
};
