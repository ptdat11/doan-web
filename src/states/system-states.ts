import { atom, selectorFamily } from "recoil";

export const urlPrefixState = atom<string>({
    key: "SYSTEM_URL_PREFIX",
    default: "https://milanoapi.dipicorp.com"
    // default: "http://127.0.0.1:4000"
});

export type MilanoAPI = "register" | "login" | "token/refresh" | "profile" | "validate-username" | "products" | "product" | "categories" | "cart/add";
export const apiUrlSelector = selectorFamily({
    key: "SYSTEM_API_URL",
    get: (api: MilanoAPI) => ({ get }) => {
        return `${get(urlPrefixState)}/api/${api}`;
    }
});

export const cloudImgUrl = "http://res.cloudinary.com/dnlb0stlx/image/upload";
export const imgUrl = (imgId: string) => {
    return `${cloudImgUrl}/${imgId}.jpg`;
}