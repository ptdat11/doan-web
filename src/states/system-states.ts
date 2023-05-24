import { atom } from "recoil";

export type Page = "home" | "about" | "product" | "order" | "sign-in" | "sign-up" | "cart";
export const pageState = atom<Page>({
    key: "SYSTEM_PAGE",
    default: "home"
});