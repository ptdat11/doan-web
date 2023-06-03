import { CartDetail } from "../cart-detail";

export interface cartConvertToOrderPOST {
    owner: string,
    total_price: number,
    OrderDetails: CartDetail[]
};