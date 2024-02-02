export const getPlaceInfo = async (planId: number) => {
  const res = await fetch(`http://13.125.188.226:8080/api/place/planId/${planId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();
  return result.data;
}