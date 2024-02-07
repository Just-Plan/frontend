import { fetchComposed } from "@/lib/returnFetch";

export async function getSearchCities(searchTerm: string): Promise<string[]> {
  const apiPath = `/api/cities/search?cityName=${searchTerm}`;
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const response = await fetchComposed(apiPath, requestOptions);

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const cities = await response.json();
    return cities;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
    throw new Error("Failed to fetch cities");
  }
}
