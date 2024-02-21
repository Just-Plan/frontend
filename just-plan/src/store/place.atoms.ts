import type { IDayPlan, IPlace } from "@/types/place.types";
import { atom } from "jotai";

const storedPlaceMockData = [
  {
    googlePlaceId: "2",
    name: "카페그루0",
    formattedAddress: "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
    types: "카페",
    latitude: "33.4360741",
    longitude: "126.5538129",
    photoReference:
      "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
  },
];

// 장소 보관함
export const storedPlace = atom<IPlace[]>(storedPlaceMockData);

export const addStorePlaceAtom = atom<IPlace[]>([]); // 장소보관함에서 추가한거
export const addedPlace = atom<IDayPlan>({});

export const deletePlaceAtom = atom<number[]>([]);
