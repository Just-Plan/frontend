export interface IComments {
  id: number;
  profile: string;
  name: string;
  mbti: string;
  date: string;
  content: string;
}

export interface IProps {
  comment: IComments;
}
