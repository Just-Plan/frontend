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
