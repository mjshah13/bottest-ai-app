import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Parse the JSON body to get htmlContent
    const { htmlContent } = req.body;

    if (!htmlContent) {
      res.status(400).json({ error: "htmlContent is required" });
      return;
    }

    // Set Headers to serve HTML content
    res.setHeader("Content-Type", "text/html");

    // Send the HTML content
    res.status(200).send(htmlContent);
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
