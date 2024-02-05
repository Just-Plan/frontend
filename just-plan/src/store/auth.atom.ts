import { atom } from "jotai";

export const loggedInAtom = atom({
  email: "",
  id: null,
  name: "",
  isLoggedIn: false,
});
