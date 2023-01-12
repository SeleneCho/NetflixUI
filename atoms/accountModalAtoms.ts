import { atom } from "recoil";

export const accountModalState = atom({
  key: "accountModalState",
  default: false,
});

export const anchorElState = atom<null | HTMLElement>({
  key: "anchorEl",
  default: null,
});
