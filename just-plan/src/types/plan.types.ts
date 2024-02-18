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

export interface IRegion2 {
  id: number;
  koreanName: string;
  englishName: string;
  introduction: string;
  countryKoreanName: string;
  countryEnglishName: string;
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
  mbti: { id: number; type: string };
  name: string;
  owner: boolean;
}

export interface IPlan2 {
  budget: { card: number; cash: number };
  days: number;
  endDate: Date;
  nights: number;
  planId: number;
  published: boolean;
  region: IRegion;
  scrapCount: number;
  scrapped: boolean | null;
  startDate: Date;
  tags: string[];
  title: string;
  users: IUser[];
  photoUrl: string | null; // 추가
}

export interface IOriginPlan {
  planId: number;
  title: string;
  users: {
    email: string;
    name: string;
    profileUrl: string | null;
    mbti: {
      id: number;
      type: string;
    };
    owner: boolean;
  }[];
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
  originPlan: IOriginPlan;
  published: boolean;
  region: IRegion;
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

export interface IRegion {
  countryEnglishName: string;
  countryKoreanName: string;
  englishName: string;
  id: number;
  introduction: string;
  koreanName: string;
  latitude: string;
  longitude: string;
}

export interface IOwner {
  email: string;
  mbti: string;
  name: string;
  owner: boolean;
}

export interface IModifyPlanInfo {
  planId: string;
  title: string;
  tags: string[]; //
  region?: IRegion; //
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
    lodging: number;
    shopping: number;
    etc: number;
  };
}

export interface IPlanListResBody {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  plans: IPlan2[];
}

export interface IScrapRequstBody {
  planId: number;
  scrap: boolean;
}

export interface IUserFinal {
  email: string;
  name: string;
  profileUrl: string;
  mbti: {
    id: number;
    type: string;
  };
  owner: boolean;
}
export interface IPlanFinal {
  // 일정 생성 response
  planId: number;
  title: string;
  users: IUserFinal[];
  scrapped: boolean;
  scrapCount: number;
  region: IRegion;
  startDate: Date;
  endDate: Date;
  photoUrl: string | null;
  published: boolean;
  originPlan: IOriginPlan;
  tags: string[];
  budget: {
    cash: number;
    card: number;
  };
  useExpense: boolean;
  expense: {
    food: number;
    transportation: number;
    lodging: number;
    shopping: number;
    etc: number;
  };
}
