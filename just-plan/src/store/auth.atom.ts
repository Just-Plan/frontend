import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { initialUserInfo } from "./auth.atom.type";
import type { UserInfo } from "./auth.atom.type";

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
  const [, setLocalStorageUserInfo] = useAtom(localStorageUserInfoAtom);

  function logout() {
    localStorage.removeItem("access-token");
    setLocalStorageUserInfo(initialUserInfo);
  }

  return logout;
}
