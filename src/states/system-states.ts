import { atom, selectorFamily } from "recoil";

export const urlPrefixState = atom<string>({
    key: "SYSTEM_URL_PREFIX",
    default: "http://localhost:4000/"
});

export type MilanoAPI = "register" | "login" | "token/refresh" | "profile";
export const apiUrlSelector = selectorFamily({
    key: "SYSTEM_API_URL",
    get: (api: MilanoAPI) => ({ get }) => {
        return `${get(urlPrefixState)}/api/${api}`;
    }
});