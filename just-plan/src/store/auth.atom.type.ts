export interface UserInfo {
  email: string;
  id: number | null;
  name: string;
  isLoggedIn: boolean;
}
export const initialUserInfo: UserInfo = {
  email: "",
  id: null,
  name: "",
  isLoggedIn: false,
};
