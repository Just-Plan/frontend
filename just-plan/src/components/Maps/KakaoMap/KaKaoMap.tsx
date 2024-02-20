/* eslint-disable @typescript-eslint/no-explicit-any */
// any 나중에 수정 필요!
"use client";
import React, { useEffect } from "react";
import { addedPlace, storedPlace } from "@/store";
import { useAtomValue } from "jotai";

declare const kakao: any; // kakao maps 타입 선언이 필요. 실제 프로젝트에서는 kakao maps 타입 정의를 사용해야 할 수도 있음.

interface IProps {
  day?: any;
  planRegion: any;
}
export const KaKaoMap = ({ day, planRegion }: IProps) => {
  const added = useAtomValue(addedPlace);
  const stored = useAtomValue(storedPlace);

  useEffect(() => {
    // Initialize Kakao Maps
    const script = document.createElement("script"); // script 라는 태그를 만든다.
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new kakao.maps.LatLng(
            planRegion.latitude,
            planRegion.longitude,
          ),
          level: 10,
        }; // 지도 중앙에 제주도 띄위기
        const map = new kakao.maps.Map(container, options); // 위에거 적용해서 맵 만들기 -> 객체?로 만든다.

        // Add markers to the map -> 장소 추가 시 마커 추가하는 부분
        added[day].forEach((location: any) => {
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              location.latitude,
              location.longitude,
            ),
            map: map,
          });

          // Add click event listener for the marker
          kakao.maps.event.addListener(marker, "click", () => {
            const markerPosition = marker.getPosition();

            map.setCenter(markerPosition);

            map.setLevel(4); // 클릭했을 때 중앙으로 이동하고 확대한다.
          }); // Push the marker into the places array for later reference
          location.marker = marker; // ?
        });
      });
    };
  }, [added, stored, day, planRegion]);
  // planRegion -> 제주도 등
  return (
    <>
      <div id="kakao-map" style={{ width: "100%", height: "100%" }} />
    </>
  );
};
export default KaKaoMap;
