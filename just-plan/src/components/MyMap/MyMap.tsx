/* eslint-disable @typescript-eslint/no-explicit-any */
// any 나중에 수정 필요!
"use client";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { addedPlace } from "@/store";
import { useAtomValue } from "jotai";
import type { IPlace } from "@/types/place.types";

declare const kakao: any; // kakao maps 타입 선언이 필요. 실제 프로젝트에서는 kakao maps 타입 정의를 사용해야 할 수도 있음.

interface IProps {
  places: IPlace[];
  day?: any;
  planRegion: any;
  width?: any;
  height?: any;
}
export const MyMap = ({ places, day, planRegion, width, height }: IProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY!,
  });
  const added = useAtomValue(addedPlace);

  const [map, setMap] = React.useState<google.maps.Map | null>(null); // 구글 지도에서 사용될 위도 경도가 포함된 지도
  const onLoad = React.useCallback(function callback(map: any) {
    // onLoad
    map.setCenter({ lat: planRegion.latitude, lng: planRegion.longitude }); // map에서 처음 center를 어떻게 할거냐. planRegion=제주도
    // 마크 추가 -> setMap 같이 들어가는...!
    setMap(map);
  }, []);

  useEffect(() => {
    if (map) {
      // Add new markers
      added[day].forEach((location: IPlace, index: number) => {
        const marker = new google.maps.Marker({
          // 마커를 새로 찍고, 그곳에 줌 들어가기 위해 eventListener 추가
          position: {
            lat: Number(location.latitude),
            lng: Number(location.longitude),
          },
          map: map,

          title: `장소 ${index + 1}`,
        });

        marker.addListener("click", () => {
          // 마커 + 마커에 대한 이벤트를 추가
          handleMarkerClick({
            lat: location.latitude,
            lng: location.longitude,
          });
        });
      });
    }
  }, [added[day], map]); // 그 날짜의 장소가 추가, 삭제시 트리거

  const onUnmount = React.useCallback(function callback(map: any) {
    console.log(map);
    setMap(null);
  }, []);

  const handleMarkerClick = (clickedLocation: any) => {
    // 마커 클릭 시 줌
    if (map) {
      map.panTo(clickedLocation); // 가운데 두기
      map.setZoom(15); // 줌
    }
  };

  const containerStyle = {
    // 크기 지정
    width: width || "100%",
    height: height || "100%",
  };

  useEffect(() => {
    if (planRegion.countryKoreanName === "대한민국") {
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
    }
  }, [added[day], planRegion]);
  // planRegion -> 제주도 등
  return (
    <>
      {planRegion.countryKoreanName === "대한민국" ? (
        <div
          id="kakao-map"
          style={{ width: width || "100%", height: height || "100%" }}
        >
          {/* This div will be replaced by the Kakao Map */}
        </div>
      ) : (
        // isLoaded -> 구글맵이 로드 됐는가 확인
        isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: planRegion.latitude, lng: planRegion.longitude }}
            zoom={11}
            onLoad={onLoad}
            // 라이브러리에서 처음 로드 시 어떻게 할거냐가 onLoad
            onUnmount={onUnmount}
          >
            {/* 구글 지도 마커를 컴포넌트 안에 넣는다는 느낌  마커 말고도 다른게 들어갈 수 있다. GoogleMap 컴포넌트 안에 children으로 마커 등을 넣어서 추가 */}
            {added[day].map((location, index) => (
              <Marker
                key={location.name}
                position={{
                  lat: Number(location.latitude),
                  lng: Number(location.longitude),
                }}
                title={`장소 ${index + 1}`}
                onClick={() =>
                  handleMarkerClick({
                    lat: location.latitude,
                    lng: location.longitude,
                  })
                }
              />
            ))}
          </GoogleMap>
        )
      )}
    </>
  );
};
export default MyMap;
