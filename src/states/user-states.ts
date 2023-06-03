import { atom } from "recoil";
import { cartGET } from "../interfaces/api-formats/cart";
import { FetchResult } from "../hooks/useFetch";

export const cartState = atom<FetchResult<cartGET[]>>({
    key: "USER_CART",
    default: {
        loading: true,
        data: null,
        errorMessage: null
    }
});