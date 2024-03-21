import { TestType } from "./typesInterface";

export const ROOT_API_URL = `https://kkhcslhnef.execute-api.us-east-1.amazonaws.com/`;

export const filterOptions = [
  {
    key: 1,
    label: "View all",
    status: "View all",
  },
  {
    key: 2,
    label: "Failed",
    status: "Fail",
  },
  {
    key: 3,
    label: "Passed",
    status: "Pass",
  },
  {
    key: 4,
    label: "Mixed",
    status: "Mixed",
  },
  {
    key: 5,
    label: "Running",
    status: "Running",
  },
  {
    key: 6,
    label: "Stopped",
    status: "Stopped",
  },
  {
    key: 7,
    label: "Skipped",
    status: "Skipped",
  },
];

export const enrichDataWithLastTests = async (
  dataArray: TestType[],
  getTestDetails: any,
  environmentId: string
) => {
  // Map over the array to convert it into an array of promises using the ids to call the API.
  const promises = dataArray.map(async (item: TestType) => {
    // Extract the id from the current item.
    const { id } = item;

    try {
      // Make the API call for the current id.
      const lastTestsData = await getTestDetails(id, environmentId);
      const lastTests = lastTestsData?.data?.sort(
        (a: TestType, b: TestType) => {
          const dateA = new Date(a?.created_at);
          const dateB = new Date(b?.created_at);

          const timeA = dateA.getHours() * 60 + dateA.getMinutes();
          const timeB = dateB.getHours() * 60 + dateB.getMinutes();

          return timeA - timeB;
        }
      );
      const status = lastTests[lastTests.length - 1]?.status;

      // Assign the API response to a new property `lastTests` in the current item.
      return { ...item, lastTests, status };
    } catch (error) {
      // Handle any possible errors. You could also choose to return the item without lastTests.
      console.error(`Failed to fetch lastTests for ID ${id}:`, error);
      return item; // Return the item without `lastTests`.
    }
  });

  // Wait for all promises to settle, then return the new data array with lastTests added to each item.
  return Promise.all(promises);
};
