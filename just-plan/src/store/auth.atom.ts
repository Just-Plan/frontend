import { useAtom, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { UserInfo } from "./auth.atom.type";

export const initialUserInfo: UserInfo = {
  email: "",
  id: null,
  name: "",
  isLoggedIn: false,
  mbtiName: "",
};
export const localStorageUserInfoAtom = atomWithStorage<UserInfo>(
  "userInfo",
  initialUserInfo,
);

export function useLogin() {
  const [, setLocalStorageUserInfo] = useAtom(localStorageUserInfoAtom);

  function login(userInfo: UserInfo) {
    setLocalStorageUserInfo({ ...userInfo, isLoggedIn: true });
  }

  return login;
}

export function useLogout() {
  const setLocalStorageUserInfo = useSetAtom(localStorageUserInfoAtom);

  function logout() {
    localStorage.removeItem("access-token");
    setLocalStorageUserInfo(initialUserInfo);
  }

  return logout;
}
