import { atom } from "recoil";

export interface UserInfo {
    name?: string,
    imgUrl?: string
};
export const userState = atom<UserInfo | undefined>({
    key: "USER_INFO",
    default: undefined
});

export interface CartItem {
    id: string,
    quantity: number
};
export const cartState = atom<CartItem[]>({
    key: "USER_CART",
    default: []
});