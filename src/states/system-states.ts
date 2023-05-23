import { atom } from "recoil";

export const pageState = atom<string>({
    key: "SYSTEM_PAGE",
    default: "home"
})