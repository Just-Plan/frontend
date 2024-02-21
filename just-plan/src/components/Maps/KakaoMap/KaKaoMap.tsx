/* eslint-disable @typescript-eslint/no-explicit-any */
// any 나중에 수정 필요!
"use client";
import React, { useEffect, useState } from "react";
import { addStorePlaceAtom, addedPlace, storedPlace } from "@/store";
import { useAtomValue } from "jotai";
import DetailPlaceModal from "@/app/(needLogin)/_components/DetailPlaceModal/DetailPlaceModal";
import type { IPlace } from "@/types/place.types";
import { Dialog } from "@/components/dialog";

declare const kakao: any; // kakao maps 타입 선언이 필요. 실제 프로젝트에서는 kakao maps 타입 정의를 사용해야 할 수도 있음.

interface IProps {
  day?: any;
  planRegion: any;
  isStore?: boolean;
  idName: string;
}
export const KaKaoMap = ({ day, planRegion, isStore, idName }: IProps) => {
  const added = useAtomValue(addedPlace);
  const stored = useAtomValue(storedPlace);
  const addStorePlace = useAtomValue(addStorePlaceAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);

  // isStore가 true 일 때, stored랑 addStorePlace랑 붙인다.
  const temp = isStore ? [...stored, ...addStorePlace] : added[day];
  // 만약 장소 보관함의 장소 추가라면
  // added[day]가 마커 찍히는게 아니라, store 에 있는게 찍히는거!
  console.log("isStore: ", isStore, "day:", day, "temp:", temp);

  useEffect(() => {
    // Initialize Kakao Maps
    const script = document.createElement("script"); // script 라는 태그를 만든다.
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        // const container = document.getElementById("kakao-map");
        const container = document.getElementById(idName);

        const options = {
          center: new kakao.maps.LatLng(
            planRegion.latitude,
            planRegion.longitude,
          ),
          level: 10,
        }; // 지도 중앙에 제주도 띄위기
        const map = new kakao.maps.Map(container, options); // 위에거 적용해서 맵 만들기 -> 객체?로 만든다.

        // Add markers to the map -> 장소 추가 시 마커 추가하는 부분
        temp.forEach((location: IPlace) => {
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

            map.setLevel(10); // 클릭했을 때 중앙으로 이동하고 확대한다.
            // 해당 장소의 상세 정보 모달 띄우기
            <DetailPlaceModal
              open={true}
              placeId={location.placeId!}
              name={location.name}
              latitude={location.latitude}
              longitude={location.longitude}
            />;
            setSelectedPlace(location); // 선택된 위치 상태 업데이트
            setModalVisible(true); // 모달 표시 상태를 true로 설정
          }); // Push the marker into the places array for later reference

          // location.marker = marker; // ?
        });

        const linePath: any[] = [];
        temp.forEach((location: any) => {
          linePath.push(
            new kakao.maps.LatLng(location.latitude, location.longitude),
          );
        });

        // 지도에 표시할 선을 생성합니다
        new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: "#FFAE00", // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
          map: map, // 지도에 선을 표시
        });
      });
    };
  }, [added, stored, day, planRegion, addStorePlace]);

  return (
    <>
      {/* <div id="kakao-map" style={{ width: "100%", height: "100%" }} /> */}
      <div></div>
      <Dialog open={modalVisible} onOpenChange={setModalVisible}>
        {modalVisible && selectedPlace && (
          <DetailPlaceModal
            open={modalVisible}
            placeId={selectedPlace.placeId!}
            name={selectedPlace.name}
            latitude={selectedPlace.latitude}
            longitude={selectedPlace.longitude}
          />
        )}
      </Dialog>
    </>
  );
};
export default KaKaoMap;
