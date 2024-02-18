export interface IPlaceComment {
  placeCommentId: number;
  user: ICommentUser;
  content: string;
  createdAt: Date;
}

export interface ICommentUser {
  email: string;
  name: string;
  totalScrap: number;
  totalUserPlan: number;
  introduction: string | null;
  mbtiName: string | null;
  profile: string | null;
  mbti: {
    id: number;
    type: string;
  };
}
