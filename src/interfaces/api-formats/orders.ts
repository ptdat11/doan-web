export interface ordersGET {
    OrderDetails: {
        product: {
            id: number,
            brand: string,
            categories: number[],
            description: string,
            image: string,
            image_public_id: string,
            name: string,
            price: number,
            rating: number
        },
        quantity: number,
        sub_price: number
    }[],
    created_at: string,
    id: number,
    owner: number,
    total_price: number
};