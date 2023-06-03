import { CartDetail } from "../cart-detail";

export interface cartGET {
    CartDetails: CartDetail[],
    total_price: number
};