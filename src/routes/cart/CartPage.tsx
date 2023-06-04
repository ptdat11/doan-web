import React, { useEffect, useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../states/system-states";
import { cartGET } from "../../interfaces/api-formats/cart";
import For from "../../components/flow-control/for/For";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";
import ErrorPrompt from "../../components/error/ErrorPrompt";
import CartDetailRow from "./components/CartDetailRow";
import { jsonFetch } from "../../submodules/networking/jsonFetch";
import Hr from "../../components/hr/Hr";
import { cartState } from "../../states/user-states";
import { PromptState } from "../../submodules/prompt/prompt-states";
import ErrorIcon from "../../components/icon/ErrorIcon";
import loading from "../../assets/loading.gif";
import Button from "../../components/button/Button";
import OrderForm from "./components/OrderForm";
import { refreshToken } from "../../submodules/networking/refresh-token";
import useProfile from "../../hooks/useProfile";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useNavigate } from "react-router-dom";

interface Props extends BasePropsPage {}

const CartPage = React.memo((props: Props) => {
   const navigate = useNavigate();
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));
    const checkLoggedIn = async () => {
        const accessToken = await refreshToken(refreshApiUrl);

        if (!accessToken) {
            navigate("/user");
        }
    };
    checkLoggedIn();

    let accessToken = useRefreshToken();
    const cartApiUrl = useRecoilValue(apiUrlSelector("cart"));
    const cartRemoveApiUrl = useRecoilValue(apiUrlSelector("remove-from-cart"));
    const convertToOrderApiUrl = useRecoilValue(apiUrlSelector("cart/convert-to-order"));
    const [cartStatus, setCartStatus] = useState<PromptState>("neutral");
    const [showingForm, setShowingForm] = useState(false);
    const profile = useProfile();
    
    const [cartDetails, setCartDetails] = useRecoilState(cartState);
    useEffect(() => {
        if (cartStatus === "warning")
            setCartStatus("neutral");

        let isCurrent = true;
        (async () => {
            accessToken = await refreshToken(refreshApiUrl)
            jsonFetch<cartGET[]>(
                cartApiUrl,
                "GET",
                undefined,
                {
                    "Authorization": "Bearer " + accessToken
                }
            ).
            then(obj => {
                if (isCurrent) {
                    setCartDetails({
                        loading: false,
                        data: obj.data,
                        errorMessage: null
                    });
                }
            }).
            catch(err => setCartDetails({
                loading: false,
                data: null,
                errorMessage: err
            }));
    
            return () => {
                isCurrent = false;
            }
        })();
    }, []);

    let details: cartGET | null = null;
    if (cartDetails.data) 
        details = cartDetails.data[0];
    
    const handleClickDel = async (pk: number) => {
        accessToken = await refreshToken(refreshApiUrl);
        setCartStatus("warning");
        fetch(
            cartRemoveApiUrl + `/${pk}`, 
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            }
        ).then(response => {
            switch (response.status) {
                case 204:
                    jsonFetch<cartGET[]>(
                        cartApiUrl,
                        "GET",
                        undefined,
                        {
                            "Authorization": "Bearer " + accessToken
                        }
                    ).then(obj => {
                        setCartDetails({
                            loading: false,
                            data: obj.data,
                            errorMessage: null
                        });
                        setCartStatus("neutral");
                    });
                    break;
                case 404:
                    setCartStatus("error");
                    break;
            }
        });
    };

    const handleClickOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!profile || !details)
            return;

        accessToken = await refreshToken(refreshApiUrl);
        jsonFetch(
            convertToOrderApiUrl, 
            "POST", 
            undefined,
            {
                "Authorization": "Bearer " + accessToken
            }
        ).then(response => {
            switch (response.status) {
                case 200:
                    window.location.reload();
            }
        });
    };

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            title="Giỏ hàng"
            backgroundColor="#eeeeee"
        >
            <Switch>
                <Match when={!!cartDetails.errorMessage}>
                    <ErrorPrompt className="m-auto" />
                </Match>

                <Match when={cartDetails.loading}>
                    <div className="w-full sm:w-11/12 h-96 mx-auto bg-[#bbbbbb] animate-pulse" />
                </Match>

                <Match when={true}>
                    <>
                    <div
                        className="w-full sm:w-11/12 p-7 mx-auto bg-white"
                    >
                        <Switch>
                            <Match when={cartStatus === "error"}>
                                <span className="text-[#c70039] flex items-center">
                                <ErrorIcon className="mr-2" size={30} />
                                Đã có lỗi xảy ra
                                </span>
                            </Match>

                            <Match when={cartStatus === "warning"}>
                                <img className="w-[26px] h-[26px] m-2" src={loading}/>
                            </Match>

                            <Match when={cartStatus === "neutral"}>
                                <img/>
                            </Match>
                        </Switch>

                        <For each={details?.CartDetails}>
                            {(detail, index) =>
                            <CartDetailRow
                                key={index}
                                detail={detail}
                                onClickDelete={() => {
                                    handleClickDel(detail.pk)
                                }}
                            />
                            }
                        </For>
                        <Hr />
                        <div className="mt-8">
                            <b>Tổng:</b> {details ? details.total_price.toLocaleString() : 0} VNĐ
                        </div>
                    </div>

                    <Button
                        className="mx-auto my-10 py-1 px-7 rounded-xl"
                        disabled={!details || details?.CartDetails.length === 0}
                        onClick={() => setShowingForm(true)}
                    >
                        Đặt hàng
                    </Button>
                    <OrderForm
                        isShowing={showingForm}
                        onClick={() => setShowingForm(false)}
                        onClickOrder={handleClickOrder}
                    />
                    </>
                </Match>
            </Switch>
        </PageLayout>
    );
});

export default CartPage;