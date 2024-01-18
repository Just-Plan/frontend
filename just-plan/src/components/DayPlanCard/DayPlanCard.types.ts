export interface IPlan {
  id: number;
  date: string;
  image: string;
  title: string;
  category: string;
  address: string;
}

export interface IProps {
  item: IPlan;
}
