/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from "react";
import { useApi } from "./useApi";

type ContactUsProps = {
  first_name: string;
  last_name: string;
  company_name: string;
  business_email: string;
  message: string;
};

const useContactUs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { request } = useApi();

  const contactUs = useCallback(async (data: ContactUsProps) => {
    try {
      setIsLoading(true);
      const contactData = await request({
        url: `/company/contact`,
        method: "POST",
        data,
      });

      setIsLoading(false);

      return contactData;
    } catch (error: any) {
      console.error({ error });
    } finally {
    }
  }, []);

  return { contactUs, isLoading };
};

export default useContactUs;
