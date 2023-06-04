import React from "react";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { useSearchParams } from "react-router-dom";
import Show from "../../components/flow-control/if/Show";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../states/system-states";
import useFetch from "../../hooks/useFetch";
import { productsGET } from "../../interfaces/api-formats/products";
import ProductList from "../../components/product/ProductList";
import { productOnCategoriesGET } from "../../interfaces/api-formats/categories";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";

interface Props extends BasePropsPage {}

const QueryPage = React.memo((props: Props) => {
    const [queryData] = useSearchParams();
    const productsApiUrl = useRecoilValue(apiUrlSelector("products"));
    const categoriesApiUrl = useRecoilValue(apiUrlSelector("categories"));

    const category = queryData.get("category");
    const keyWord = queryData.get("key");

    let url = categoriesApiUrl + `/${category}`;
    const products = useFetch<productOnCategoriesGET>({
        url: url,
        method: "GET",
        removeEndSlash: true
    }, [category]);

    const searches = useFetch<productsGET[]>({
        url: productsApiUrl,
        method: "GET",
        data: {
            name: keyWord
        }
    }, [keyWord]);

    const resultList = products.data?.products ?? searches.data;

    return (
        <PageLayout
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            title={category ? `Sản phẩm / ${category}` : `Tìm kiếm / ${keyWord}`}
        >
            <Switch>
                <Match when={products.loading || searches.loading}>
                    <div className="w-11/12 h-96 mx-auto bg-[#bbbbbb] animate-pulse" />
                </Match>

                <Match when={!!resultList}>
                    <ProductList 
                        products={resultList as productsGET[]}
                    />
                </Match>
            </Switch>
        </PageLayout>
    );
});

export default QueryPage;