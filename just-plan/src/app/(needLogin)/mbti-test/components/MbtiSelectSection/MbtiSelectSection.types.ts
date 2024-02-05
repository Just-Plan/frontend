export interface TravelQuestion {
  question: string;
  answers: TravelAnswer[];
}

interface TravelAnswer {
  answerId: number;
  answer: string;
}

export interface TravelData {
  data: TravelQuestion[];
}
