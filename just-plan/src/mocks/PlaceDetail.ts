import type { IComments } from "@/app/(needLogin)/_components/Comments/Comments.types";

interface IPlaceDetailInfo {
  category: string;
  title: string;
  engTitle: string;
  image: string;
  mbti: string[];
  status: boolean;
  endTime: string;
  businessHours: {
    id: number;
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  comments: IComments[];
}

export const PlaceDetailInfo: IPlaceDetailInfo = {
  category: "이동수단",
  title: "제주 국제 공항",
  engTitle: "Jeju International Airport",
  image: "/images/image1.png",
  mbti: ["ENFP", "INTP", "ESTP", "ISFJ", "ENTJ"],
  status: true,
  endTime: "19:00",
  businessHours: [
    { id: 1, day: "일요일", openTime: "00:00", closeTime: "24:00" },
    { id: 2, day: "월요일", openTime: "00:00", closeTime: "24:00" },
    { id: 3, day: "화요일", openTime: "00:00", closeTime: "24:00" },
    { id: 4, day: "수요일", openTime: "00:00", closeTime: "24:00" },
    { id: 5, day: "목요일", openTime: "00:00", closeTime: "24:00" },
    { id: 6, day: "금요일", openTime: "00:00", closeTime: "24:00" },
    { id: 7, day: "토요일", openTime: "00:00", closeTime: "24:00" },
  ],
  comments: [
    {
      id: 1,
      profile: "/images/image1.png",
      name: "강윤지",
      mbti: "INFJ",
      date: "2024.01.05",
      content: "댓글! 내용!",
    },
    {
      id: 2,
      profile: "/images/image1.png",
      name: "강윤지",
      mbti: "INFJ",
      date: "2024.01.05",
      content: "댓글! 내용!",
    },
    {
      id: 3,
      profile: "/images/image1.png",
      name: "강윤지",
      mbti: "INFJ",
      date: "2024.01.05",
      content: "댓글! 내용!",
    },
    {
      id: 4,
      profile: "/images/image1.png",
      name: "강윤지",
      mbti: "INFJ",
      date: "2024.01.05",
      content: "댓글! 내용!",
    },
  ],
};
