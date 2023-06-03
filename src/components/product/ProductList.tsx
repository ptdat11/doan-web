import React, { useState } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import Switch from "../flow-control/switch/Switch";
import Match from "../flow-control/switch/Match";
import For from "../flow-control/for/For";
import ProductCard from "./ProductCard";
import { productsGET } from "../../interfaces/api-formats/products";
import Button from "../button/Button";
import ProductLayout from "../layout/product-layout/ProductLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { productCountPerPage } from "../../variables.css";
import { range } from "../../submodules/array-processing/range";

interface Props extends BaseProps {
    products: productsGET[] | undefined,
}

const ProductList: React.FC<Props> = React.memo((props) => {
    const [page, setPage] = useState(1);
    const [botRange, topRange] = [
        (page - 1) * productCountPerPage,
        page * productCountPerPage
    ];
    let maxPossiblePage = props.products ? Math.floor(props.products.length / productCountPerPage) + 1 : 1;
    const [minPage, maxPage] = [
        Math.max(page - 2, 1),
        Math.min(
            maxPossiblePage,
            page + 2
        )
    ];

    return (
        <div
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            <Switch>
                <Match when={!props.products}>
                    <div className="animate-pulse bg-[#bbbbbb] w-full h-96 my-auto"/>
                </Match>
                
                <Match when={true}>
                    <ProductLayout>
                        <For 
                        each={props.products?.slice(botRange, topRange)}
                        fallback={<div className="col-span-full w-full h-72 sm:h-64 mb-10 bg-[#bbbbbb] animate-pulse" />}
                        >
                        {(product, index) =>
                        <ProductCard
                            key={index}
                            id={product.id}
                            name={product.name}
                            rating={product.rating}
                            price={product.price}
                            imgId={product.image_public_id}
                        />
                        }
                        </For>

                        <div className="mx-auto my-7 col-span-full flex justify-center [&>*]:rounded-sm [&>*]:mx-1 [&>*]:w-[3.7rem] [&>*]:text-center">
                            <Button
                                onClick={() => setPage(1)}
                            >
                                Đầu
                            </Button>
                            <Button
                                onClick={() => setPage(Math.max(page - 1, 1))}
                            >
                                {"<"}
                            </Button>
                            <For each={range(minPage, maxPage + 1)}>
                                {(pageNum, index) => 
                                <Button
                                    key={index}
                                    backgroundColor={page === pageNum ? "#999999" : "#bbbbbb"}
                                    onClick={() => setPage(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                                }
                            </For>
                            <Button
                                onClick={() => setPage(Math.min(page + 1, maxPossiblePage))}
                            >
                                {">"}
                            </Button>
                            <Button
                                onClick={() => setPage(maxPossiblePage)}
                            >
                                Cuối
                            </Button>
                        </div>
                    </ProductLayout>
                </Match>
                
            </Switch>

        </div>
    );
});

export default ProductList;