import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { UserInfo, initialUserInfo } from "./auth.atom.type";

export const localStorageUserInfoAtom = atomWithStorage<UserInfo>(
  "userInfo",
  initialUserInfo,
);
export function login(userInfo: UserInfo) {
  const [, setLocalStorageUserInfo] = useAtom(localStorageUserInfoAtom);
  setLocalStorageUserInfo({ ...userInfo, isLoggedIn: true });
}
// 로그아웃 함수
export function logout() {
  const [, setLocalStorageUserInfo] = useAtom(localStorageUserInfoAtom);
  setLocalStorageUserInfo(initialUserInfo);
}
