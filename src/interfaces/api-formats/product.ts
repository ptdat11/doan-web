export interface productGET {
    categories: {
        name: string
    }[],
    name: string,
    brand: string,
    price: number,
    rating: number,
    description: string,
    image_public_id: string
};