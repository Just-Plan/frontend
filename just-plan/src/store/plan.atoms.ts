import type { IPlanInfoDetail } from "@/types/plan.types";
import { atom } from "jotai";

const defaultPlanInfo: IPlanInfoDetail = {
  planId: "",
  budget: { card: 0, cash: 0 },
  endDate: new Date(),
  expense: {
    food: 0,
    transportation: 0,
    loadging: 0,
    shopping: 0,
    etc: 0,
  },
  originPlan: 0,
  published: false,
  region: {
    countryEnglishName: "",
    countryKoreanName: "",
    englishName: "",
    id: 0,
    introduction: "",
    koreanName: "",
    latitude: 0,
    longitude: 0,
  },
  startDate: new Date(),
  tags: [""],
  title: "",
  useExpense: false,
  users: [
    {
      email: "",
      mbti: "",
      name: "",
      owner: false,
    },
  ],
};

export const planInfoAtom = atom<IPlanInfoDetail>(defaultPlanInfo);
