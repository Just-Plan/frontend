import type { ILocationInfo, IPlanInfo } from "@/types/plan.types";

// 일정 페이지 목데이터
export const Plan: ILocationInfo[] = [
  {
    id: 1,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 일출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: "120",
  },
  {
    id: 2,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 이출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: "120",
  },
  {
    id: 3,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 삼출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: "120",
  },
  {
    id: 4,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 사출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: "120",
  },
  {
    id: 5,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 오출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: "120",
  },
  {
    id: 6,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 육출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: "120",
  },
  {
    id: 7,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 칠출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: null,
  },
];

export const Plan2 = {
  1: [
    {
      googlePlaceId: null,
      name: "카페그루0",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      order: 1,
      memo: {
        color: "string",
        text: "string",
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
      order: 1,
      memo: {
        color: "string",
        text: "string",
      },
    },
  ],
  2: [
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
      order: 1,
      memo: {
        color: "string",
        text: "string",
      },
    },
    {
      googlePlaceId: null,
      name: "카페그루4",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      order: 1,
      memo: {
        color: "string",
        text: "string",
      },
    },
    {
      googlePlaceId: null,
      name: "카페그루5",
      formattedAddress:
        "대한민국 제주특별자치도 제주시 아라일동 산록북로 819-12",
      types: "카페",
      latitude: "33.4360741",
      longitude: "126.5538129",
      photoReference:
        "https://lh3.googleusercontent.com/p/AF1QipPgjnSs7v28R0lxK-E5PUbL2SFtBkAQNoeakQNN=w400",
      order: 1,
      memo: {
        color: "string",
        text: "string",
      },
    },
  ],
};

export const PlanInfo: IPlanInfo = {
  location: "제주도",
  date: "2024-01-05~2024-02-05",
  title: "강윤지님의 제주도 먹고뿌셔",
  hashTags: ["감성", "먹부림"],
  cache: 200000,
  card: 500000,
};

// 장소 보관함
export const StoredPlace: ILocationInfo[] = [
  {
    id: 10,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 일출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: null,
  },
  {
    id: 20,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 이출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: null,
  },
  {
    id: 30,
    date: "2024.01.12",
    image: "/images/image1.png",
    title: "성산 삼출봉",
    category: "명소",
    address: "인천시 미추홀구",
    time: null,
  },
];
