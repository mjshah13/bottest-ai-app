import { useState } from "react";
import axios from "axios";
import { printReport } from "../utils/common";
import { AnalyticsReportType } from "../utils/typesInterface";

interface UsePDFHook {
  generatePDF: (data: AnalyticsReportType) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const usePDF = (): UsePDFHook => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generatePDF = async (data: AnalyticsReportType): Promise<void> => {
    const htmlContent = printReport(data);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/pdf", {
        htmlContent,
      });

      const responseData = response.data;
      // Open the HTML content in a new window
      const newWindow = window.open("", "_blank")!;
      newWindow.document.write(responseData);
      newWindow.document.close();
    } catch (err) {
      console.log("error");

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Failed to generate HTML");
      } else {
        setError("Failed to generate HTML");
      }
    } finally {
      setLoading(false);
      console.log("final");
    }
  };

  return { generatePDF, loading, error };
};

export default usePDF;
