import { fetchComposed } from "@/lib/returnFetch";
import { useState, useEffect } from "react";

interface FetchOptions {}

interface FetchData<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

const useFetchComposed = <T>(
  url: string,
  options?: FetchOptions,
): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetchComposed(url, options);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};

export default useFetchComposed;
