import React, { useEffect, useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import { useLoaderData } from "react-router-dom";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import { useRecoilValue } from "recoil";
import { apiUrlSelector, imgUrl } from "../../states/system-states";
import useFetch from "../../hooks/useFetch";
import { productGET } from "../../interfaces/api-formats/product";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import Show from "../../components/flow-control/if/Show";
import RatingLine from "../../components/product/RatingLine";
import Hr from "../../components/hr/Hr";
import Button from "../../components/button/Button";
import ProductDetail from "./components/ProductDetail";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";
import ErrorPrompt from "../../components/error/ErrorPrompt";

interface Props extends BasePropsPage {}

const ProductPage = React.memo((props: Props) => {
    const id = useLoaderData() as number;
    const productApiUrl = useRecoilValue(apiUrlSelector("product"));
    const product = useFetch<productGET>({
        url: `${productApiUrl}/${id}/`,
        method: "GET"
    }, [id]);
    let starSize = window.innerHeight / 40;

    

    return (
        <PageLayout
            title={`Sản phẩm / ${product.data?.name ?? ""}`}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            backgroundColor="#eeeeee"
        >
            <Switch>
                <Match when={product.errorMessage != null}>
                    <ErrorPrompt className="mx-auto" />
                </Match>

                <Match when={true}>
                    <Show
                        when={!product.loading}
                        fallback={<div className="animate-pulse bg-[#bbbbbb] w-full h-96 my-auto"/>}
                    >
                        <ProductDetail
                            product={product.data}
                        />             
                    </Show>
                </Match>
            </Switch>
        </PageLayout>
    );
});

export default ProductPage;