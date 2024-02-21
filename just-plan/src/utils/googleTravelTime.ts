export async function getGoogleTravelTimes(
  origin: string[],
  destination: string[],
) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.join(",")}&destination=${destination.join(",")}&key=${process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY}`,
    );
    const data = await response.json();
    const travelTime = data.routes[0].summary.duration; // 이동 시간 추출
    return Math.floor(travelTime / 60);
  } catch (error) {
    console.error("에러 발생:", error);
    return null;
  }
}
