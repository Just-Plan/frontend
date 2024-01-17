export interface ICardUserData {
  id: number;
  image: string;
  profile: string;
  name: string;
  date: string;
  money: string;
  count: number;
  mbti: string;
  hashTags: {
    id: number;
    tag: string;
  }[];
}

export interface Props {
  item: ICardUserData;
}
