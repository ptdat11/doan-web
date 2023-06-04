import { productsGET } from "./products";

export interface categoriesGET {
    id: number,
    name: string
}[];

export interface productOnCategoriesGET {
    name: string,
    products: productsGET[]
};