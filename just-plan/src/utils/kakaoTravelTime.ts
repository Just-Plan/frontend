export async function getKaKaoTravelTimes(origin, destination) {
  try {
    // const response = await fetch(
    //   `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.join(",")}&destination=${destination.join(",")}`,
    //   {
    //     headers: {
    //       Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}`,
    //     },
    //   },
    // );
    // const data = await response.json();
    // console.log(data);
    // const travelTime = data.routes[0].summary.duration; // 이동 시간 추출

    return 55;
  } catch (error) {
    console.error("에러 발생:", error);
    return null;
  }
}
