import { fetchComposed } from "@/lib/returnFetch";
import { useState, useEffect } from "react";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface UseMutationProps<T> {
  loading: boolean;
  data?: T;
  error?: string;
  reset: () => void;
}

type UseFetchComposedResult<T> = [(data: any) => void, UseMutationProps<T>];

const useFetchComposed = <T>(
  url: string,
  method: MutationMethod = "POST",
): UseFetchComposedResult<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | T>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  const fetchData = async (data: any) => {
    setLoading(true);
    fetchComposed(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}` || "",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 500) {
          throw new Error("Internal Server Error");
        }
        return response.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  function reset() {
    setData(undefined);
    setLoading(false);
    setError(undefined);
  }
  return [fetchData, { loading, data, error, reset }];
};

export default useFetchComposed;
