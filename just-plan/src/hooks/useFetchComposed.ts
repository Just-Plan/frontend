import { useState } from "react";
import { fetchComposed } from "@/lib/returnFetch";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface UseMutationProps<T> {
  loading: boolean;
  data?: T;
  error?: string;
  reset: () => void;
}

type UseFetchComposedResult<T> = [
  (data: any) => Promise<void>,
  UseMutationProps<T>,
];

const useFetchComposed = <T>(
  url: string,
  method: MutationMethod = "POST",
): UseFetchComposedResult<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | T>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  const fetchData = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response: Response = await fetchComposed(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}` || "",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Response:", response);
      console.log("Response Data:", responseData);
      setData(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  function reset() {
    setData(undefined);
    setLoading(false);
    setError(undefined);
  }

  return [fetchData, { loading, data, error, reset }];
};

export default useFetchComposed;
