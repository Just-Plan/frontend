import type { IPlan2 } from "@/types/plan.types";

// main page 목데이터
export const SearchResult = [
  { id: 1, name: "제주", country: "대한민국" },
  { id: 2, name: "제주", country: "대한민국" },
  { id: 3, name: "제주", country: "대한민국" },
  { id: 4, name: "제주", country: "대한민국" },
  { id: 5, name: "제주", country: "대한민국" },
  { id: 6, name: "제주", country: "대한민국" },
  { id: 7, name: "제주", country: "대한민국" },
  { id: 8, name: "제주", country: "대한민국" },
  { id: 9, name: "제주", country: "대한민국" },
  { id: 10, name: "제주", country: "대한민국" },
];

const regionTemp = {
  countryEnglishName: "string",
  countryKoreanName: "string",
  englishName: "string",
  id: 1,
  introduction: "string",
  koreanName: "string",
  latitude: "string",
  longitude: "string",
};

const user = {
  email: "string",
  mbti: { id: 0, type: "INFJ" },
  name: "string",
  owner: true,
  profileUrl: null,
};

export const PopularCardContent: IPlan2[] = [
  {
    budget: { card: 0, cash: 0 },
    days: 2,
    endDate: new Date(),
    nights: 3,
    planId: 1,
    published: true,
    region: regionTemp,
    scrapCount: 0,
    scrapped: false,
    startDate: new Date(),
    tags: ["태그"],
    title: "제목1",
    users: [user],
    photoUrl: null, // 추가
  },
  {
    budget: { card: 0, cash: 0 },
    days: 2,
    endDate: new Date(),
    nights: 3,
    planId: 2,
    published: true,
    region: regionTemp,
    scrapCount: 0,
    scrapped: false,
    startDate: new Date(),
    tags: ["태그"],
    title: "제목1",
    users: [user],
    photoUrl: null, // 추가
  },
  {
    budget: { card: 0, cash: 0 },
    days: 2,
    endDate: new Date(),
    nights: 3,
    planId: 3,
    published: true,
    region: regionTemp,
    scrapCount: 0,
    scrapped: false,
    startDate: new Date(),
    tags: ["태그"],
    title: "제목1",
    users: [user],
    photoUrl: null, // 추가
  },
  {
    budget: { card: 0, cash: 0 },
    days: 2,
    endDate: new Date(),
    nights: 3,
    planId: 4,
    published: true,
    region: regionTemp,
    scrapCount: 0,
    scrapped: false,
    startDate: new Date(),
    tags: ["태그"],
    title: "제목1",
    users: [user],
    photoUrl: null, // 추가
  },
];

export const MbtiCardContent = [
  {
    id: 1,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 2,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 3,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 4,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 5,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 6,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 7,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
  {
    id: 8,
    image: "/images/image1.png",
    profile: "/images/image1.png",
    name: "강윤지",
    date: "4박 5일",
    money: "1,000,000원",
    count: 137,
    mbti: "INFJ",
    hashTags: ["감성", "먹부림"],
  },
];
