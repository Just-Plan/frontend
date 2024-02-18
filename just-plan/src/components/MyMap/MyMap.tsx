/* eslint-disable @typescript-eslint/no-explicit-any */
// any 나중에 수정 필요!
"use client";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { addedPlace } from "@/store";
import { useAtomValue } from "jotai";
import type { IPlace } from "@/types/place.types";

export const MyMap = ({ places, day, planRegion, width, height }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY!,
  });
  const added = useAtomValue(addedPlace);

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const onLoad = React.useCallback(function callback(map: any) {
    map.setCenter({ lat: planRegion.latitude, lng: planRegion.longitude });
    setMap(map);
  }, []);
  useEffect(() => {
    if (map) {
      // Add new markers
      added[day].forEach((location: IPlace, index: number) => {
        const marker = new google.maps.Marker({
          position: {
            lat: Number(location.latitude),
            lng: Number(location.longitude),
          },
          map: map,

          title: `장소 ${index + 1}`,
        });

        marker.addListener("click", () => {
          handleMarkerClick({
            lat: location.latitude,
            lng: location.longitude,
          });
        });
      });
    }
  }, [added[day], map]);

  const onUnmount = React.useCallback(function callback(map: any) {
    console.log(map);
    setMap(null);
  }, []);

  const handleMarkerClick = (clickedLocation: any) => {
    if (map) {
      map.panTo(clickedLocation);
      map.setZoom(15);
    }
  };
  const containerStyle = {
    width: width || "100%",
    height: height || "100%",
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: planRegion.latitude, lng: planRegion.longitude }}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {places.map((location: any, index: any) => (
        <Marker
          key={location.id}
          position={{ lat: location.latitude, lng: location.longitude }}
          title={`장소 ${index + 1}`} // 각 마커에 대한 타이틀 설정
          onClick={() =>
            handleMarkerClick({
              lat: location.latitude,
              lng: location.longitude,
            })
          }
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MyMap;
