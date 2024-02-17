"use client";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { addedPlace } from "@/store";
import { useAtom } from "jotai";

export const MyMap = ({ places, day, planRegion, width, height }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY!,
  });
  const [added, setAdded] = useAtom(addedPlace);

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const onLoad = React.useCallback(function callback(map: any) {
    map.setCenter({ lat: planRegion.latitude, lng: planRegion.longitude });
    // const bounds = new window.google.maps.LatLngBounds();
    // locations.forEach((location) => {
    //   bounds.extend(location);
    // });
    // map.fitBounds(bounds);
    setMap(map);
  }, []);
  useEffect(() => {
    if (map) {
      // Add new markers
      added[day].forEach((location: any, index: number) => {
        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
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
      {places.map((location, index) => (
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
