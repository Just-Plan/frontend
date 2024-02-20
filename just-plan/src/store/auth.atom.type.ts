export interface UserInfo {
  email: string;
  id?: number | null;
  name: string;
  isLoggedIn: boolean;
  mbtiName: string;
  profile: string | null;
  totalScrap?: number;
  totalUserPlan?: number;
  introduction?: null | string;
}
