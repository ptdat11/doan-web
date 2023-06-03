import React from "react";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { useSearchParams } from "react-router-dom";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";
import Show from "../../components/flow-control/if/Show";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../states/system-states";
import useFetch from "../../hooks/useFetch";
import { productsGET } from "../../interfaces/api-formats/products";
import ProductList from "../../components/product/ProductList";

interface Props extends BasePropsPage {}

const QueryPage = React.memo((props: Props) => {
    const [queryData] = useSearchParams();
    const productsApiUrl = useRecoilValue(apiUrlSelector("products"));
    const categoriesApiUrl = useRecoilValue(apiUrlSelector("categories"));

    const category = queryData.get("category");
    const search = queryData.get("search");

    const products = useFetch<productsGET[]>({
        url: productsApiUrl + `/${category}`,
        method: "GET"
    }, []);

//    const searches = useFetch<

    return (
        <PageLayout
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            title={category ? `Sản phẩm / ${category}` : undefined}
        >
            <Show when={!!products.data}>
                <ProductList 
                    products={products.data as productsGET[]}
                />
            </Show>
        </PageLayout>
    );
});

export default QueryPage;