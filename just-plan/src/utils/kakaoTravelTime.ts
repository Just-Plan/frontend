export async function getKaKaoTravelTimes(
  origin: string[],
  destination: string[],
) {
  try {
    const response = await fetch(
      `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.join(",")}&destination=${destination.join(",")}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}`,
        },
      },
    );
    const data = await response.json();
    const travelTime = data.routes[0].summary.duration; // 이동 시간 추출
    return Math.floor(travelTime / 60);
  } catch (error) {
    console.error("에러 발생:", error);
    return null;
  }
}
