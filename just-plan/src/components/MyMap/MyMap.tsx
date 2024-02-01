"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export const MyMap = ({ location, width, height }: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY!,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  const handleMarkerClick = () => {
    if (map) {
      map.panTo(location);
      map.setZoom(20);
    }
  };
  const containerStyle = {
    width: width || "100%",
    height: height || "400px",
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={20}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={location}
        title="특정 장소"
        onClick={handleMarkerClick}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MyMap;
