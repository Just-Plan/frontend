export interface ILocationInfo {
  id: number;
  date: string;
  image: string;
  title: string;
  category: string;
  address: string;
  time: string | null;
}

export interface IProps {
  item: ILocationInfo;
}

export interface IPlanInfo {
  location: string;
  date: string;
  title: string;
  hashTags: string[];
  cache: number;
  card: number;
}

export interface IPlan {
  planId: number;
  title: string;
  region: string;
  startDate: string;
  endDate: string;
  published: boolean;
  tags: string[];
  image: string;
  profile: string;
  name: string;
  mbti: string;
  money: number;
  count: number;
  date: string;
}

interface IUser {
  email: string;
  mbti: {id: number, type: string};
  name: string;
  owner: boolean;
}

export interface IPlan2 {
  budget: {card: number, cash: number};
  days: number;
  endDate: Date;
  nights: number;
  planId: number;
  published: boolean;
  region: {
    id: number; 
    koreanName: string;
    englishName: string;
    introduction: string;
    countryKoreanName: string;
    countryEnglishName: string;
  }
  scrapCount: number;
  startDate: Date;
  tags: string[];
  title: string;
  users: IUser[];

  // planId: number;
  // title: string;
  // region: string;
  // startDate: string;
  // endDate: string;
  // published: boolean;
  // tags: string[];
  // image: string;
  // profile: string;
  // name: string;
  // mbti: string;
  // money: number;
  // count: number;
  // date: string;
}

export interface IPlanInfoDetail {
  planId: string;
  budget: { card: number; cash: number };
  endDate: Date;
  expense: {
    food: number;
    transportation: number;
    loadging: number;
    shopping: number;
    etc: number;
  };
  originPlan: any;
  published: boolean;
  region: {
    countryEnglishName: string;
    countryKoreanName: string;
    englishName: string;
    id: number;
    introduction: string;
    koreanName: string;
  };
  startDate: Date;
  tags: string[];
  title: string;
  useExpense: boolean;
  users: {
    email: string;
    mbti: string;
    name: string;
    owner: boolean;
  }[];
}

export interface IModifyPlanInfo {
  planId: string;
  title: string;
  tags: string[];
  startDate: Date;
  endDate: Date;
  published: boolean;
  budget: {
    cash: number;
    card: number;
  };
  useExpense: boolean;
  expense: {
    food: number;
    transportation: number;
    loadging: number;
    shopping: number;
    etc: number;
  };
}
