export interface CartDetail {
    pk: number,
    product: {
        id: number,
        name: string,
        image_public_id: string
    },
    quantity: number,
    sub_price: number
};