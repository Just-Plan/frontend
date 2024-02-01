export const getSearchPlaceResult = async (cityId: number, query: string) => {
  const res = await fetch(`http://13.125.188.226:8080/api/search/place/cityId/${cityId}?query=${query}`);

  return res.json();
}