import type { IPlanInfoDetail } from "@/types/plan.types";
import { atom } from "jotai";

const defaultPlanInfo: IPlanInfoDetail = {
  planId: "",
  budget: { card: 0, cash: 0 },
  endDate: new Date(),
  expense: {
    food: 0,
    transportation: 0,
    lodging: 0,
    shopping: 0,
    etc: 0,
  },
  originPlan: null,
  published: false,
  region: {
    countryEnglishName: "",
    countryKoreanName: "",
    englishName: "",
    id: 0,
    introduction: "",
    koreanName: "",
    latitude: "",
    longitude: "",
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
