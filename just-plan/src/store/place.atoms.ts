import type { IDayPlan, IPlace } from "@/types/place.types";
import { atom } from "jotai";

// 장소 보관함
export const storedPlace = atom<IPlace[]>([
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
]);

export const addedPlace = atom<IDayPlan>({
  "1": [
    {
      googlePlaceId: null,
      name: "카페그루10",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      orderNum: 1,
      memo: {
        color: "string",
        content: "string",
      },
    },
    {
      googlePlaceId: null,
      name: "카페그루11",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      orderNum: 1,
      memo: {
        color: "string",
        content: "string",
      },
    },
  ],
  "2": [
    {
      googlePlaceId: null,
      name: "카페그루1",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      orderNum: 1,
      memo: {
        color: "string",
        content: "string",
      },
    },
    {
      googlePlaceId: null,
      name: "카페그루2",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      orderNum: 1,
      memo: {
        color: "string",
        content: "string",
      },
    },
    {
      googlePlaceId: null,
      name: "카페그루3",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      orderNum: 1,
      memo: {
        color: "string",
        content: "string",
      },
    },
  ],
});

export const deletePlaceAtom = atom<number[]>([]);
