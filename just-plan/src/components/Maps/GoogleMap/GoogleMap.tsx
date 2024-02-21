/* eslint-disable @typescript-eslint/no-explicit-any */
// any 나중에 수정 필요!
"use client";
import React, { useEffect } from "react";
import {
  GoogleMap as GoogleMapComponent,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import { addStorePlaceAtom, addedPlace, storedPlace } from "@/store";
import { useAtomValue } from "jotai";
import type { IPlace } from "@/types/place.types";
import type { IRegion } from "@/types/plan.types";

interface IProps {
  day?: any;
  planRegion: IRegion;
  isStore?: boolean;
}
export const GoogleMap = ({ day, planRegion, isStore }: IProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY!,
  });
  const added = useAtomValue(addedPlace);
  const stored = useAtomValue(storedPlace);
  const addStorePlace = useAtomValue(addStorePlaceAtom);

  // isStore가 true 일 때, stored랑 addStorePlace랑 붙인다.
  const temp = isStore ? [...stored, ...addStorePlace] : added[day];
  // 만약 장소 보관함의 장소 추가라면
  // added[day]가 마커 찍히는게 아니라, store 에 있는게 찍히는거!
  console.log("isStore: ", isStore, "day:", day, "temp:", temp);

  //////////

  const [map, setMap] = React.useState<google.maps.Map | null>(null); // 구글 지도에서 사용될 위도 경도가 포함된 지도
  const onLoad = React.useCallback(function callback(map: any) {
    console.log("지도 load");
    // onLoad
    map.setCenter({ lat: planRegion.latitude, lng: planRegion.longitude }); // map에서 처음 center를 어떻게 할거냐. planRegion=제주도
    // 마크 추가 -> setMap 같이 들어가는...!
    setMap(map);
  }, []);

  useEffect(() => {
    if (map) {
      // Add new markers
      temp?.forEach((location: IPlace, index: number) => {
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
  }, [added, stored, planRegion, addStorePlace]); // 그 날짜의 장소가 추가, 삭제시 트리거

  useEffect(() => {
    setMap(null);
  }, [day]);

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
    width: "100%",
    height: "100%",
  };

  // planRegion -> 제주도 등
  return (
    <>
      {isLoaded && (
        <GoogleMapComponent
          mapContainerStyle={containerStyle}
          center={{
            lat: Number(planRegion.latitude),
            lng: Number(planRegion.longitude),
          }}
          zoom={11}
          onLoad={onLoad}
          // 라이브러리에서 처음 로드 시 어떻게 할거냐가 onLoad
          onUnmount={onUnmount}
        >
          {/* 구글 지도 마커를 컴포넌트 안에 넣는다는 느낌  마커 말고도 다른게 들어갈 수 있다. GoogleMap 컴포넌트 안에 children으로 마커 등을 넣어서 추가 */}
          {temp?.map((location, index) => (
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
        </GoogleMapComponent>
      )}
    </>
  );
};
export default GoogleMap;
