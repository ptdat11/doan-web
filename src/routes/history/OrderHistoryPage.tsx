import React from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import useRefreshToken from "../../hooks/useRefreshToken";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../states/system-states";
import { ordersGET } from "../../interfaces/api-formats/orders";
import For from "../../components/flow-control/for/For";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";
import OrderHistoryRecord from "./components/OrderHistoryRecord";
import ErrorPrompt from "../../components/error/ErrorPrompt";
import useAuthorizedFetch from "../../hooks/useAuthorizedFetch";

interface Props extends BasePropsPage {}

const OrderHistoryPage = React.memo((props: Props) => {
    const access = useRefreshToken();
    const navigate = useNavigate();
    if (!access) {
        navigate("/user");
    }

    const ordersApiUrl = useRecoilValue(apiUrlSelector("orders"));
    const orders = useAuthorizedFetch<ordersGET[]>({
        url: ordersApiUrl,
        method: "GET"
    });
    

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            title="Lịch sử mua hàng"
        >
            <Switch>
                <Match when={orders.loading}>
                    <div className="w-full sm:w-11/12 h-72 mx-auto bg-[#bbbbbb] animate-pulse" />
                </Match>

                <Match when={orders.data && orders.data.length === 0}>
                    <h2>
                        Bạn chưa từng mua đồ trước đây, Hãy ghé <Link to="/">trang chủ</Link> và chọn lựa món đồ bạn thích nhé {"(≥o≤)"}
                    </h2>
                </Match>

                <Match when={orders.data !== null && "map" in orders.data}>
                    <div className="px-5 lg:px-60 xl:px-96 [&>*]:mx-auto">
                    <For 
                        each={orders.data}
                        fallback={<ErrorPrompt className="mx-auto" />}
                    >
                        {(order, index) => 
                        <OrderHistoryRecord
                            key={index}
                            record={order}
                        />
                        }
                    </For>
                    </div>
                </Match>
            </Switch>
        </PageLayout>
    )
});

export default OrderHistoryPage;