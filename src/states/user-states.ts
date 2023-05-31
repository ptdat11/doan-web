import { atom } from "recoil";

export interface CartItem {
    id: string,
    quantity: number
};
export const cartState = atom<CartItem[]>({
    key: "USER_CART",
    default: []
});