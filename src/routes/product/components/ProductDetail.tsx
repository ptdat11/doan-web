import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { productGET } from "../../../interfaces/api-formats/product";
import { apiUrlSelector, imgUrl } from "../../../states/system-states";
import RatingLine from "../../../components/product/RatingLine";
import Hr from "../../../components/hr/Hr";
import Button from "../../../components/button/Button";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { useRecoilValue } from "recoil";
import { jsonFetch } from "../../../submodules/networking/jsonFetch";
import { cartAddPOST } from "../../../interfaces/api-formats/cart-add";
import useRefreshToken from "../../../hooks/useRefreshToken";
import SuccessIcon from "../../../components/icon/SuccessIcon";
import ErrorIcon from "../../../components/icon/ErrorIcon";
import Switch from "../../../components/flow-control/switch/Switch";
import Match from "../../../components/flow-control/switch/Match";
import { PromptState } from "../../../submodules/prompt/prompt-states";
import { Link } from "react-router-dom";
import loading from "../../../assets/loading.gif";
import { refreshToken } from "../../../submodules/networking/refresh-token";

interface Props extends BaseProps {
    product?: productGET | null,
    id: number
}

const ProductDetail: React.FC<Props> = React.memo((props) => {
    const [amount, setAmount] = useState(1);
    const [cartStatus, setCartStatus] = useState<PromptState>("warning");
    const cartAddApiUrl = useRecoilValue(apiUrlSelector("cart/add"));
    let accessToken = useRefreshToken();
    const refreshApiUrl = useRecoilValue(apiUrlSelector("token/refresh"));

    const handleClickAddToCart = async () => {
        accessToken = await refreshToken(refreshApiUrl);
        const cartAddData: cartAddPOST = {
            product_id: props.id,
            quantity: amount
        };

        setCartStatus("neutral");
        jsonFetch(
            cartAddApiUrl, 
            "POST", 
            cartAddData,
            {
                "Authorization": "Bearer " + accessToken
            }
        ).then(response => {
            switch (response.status) {
                case 200:
                    setCartStatus("success");
                    break;
                default:
                    setCartStatus("error");
            }
        })
    };

    return (
        <div
            className={combineClassnames(
                props.className,
                "w-full sm:w-10/12 p-3 m-auto bg-white flex max-sm:flex-col"
            )}
            style={{...props.style}}
        >
            <div
                className="w-full sm:w-1/3 h-60 sm:h-full my-auto flex items-center [&>img]:mx-auto overflow-hidden"
            >
                <img className="max-sm:h-full" src={imgUrl(props.product?.image_public_id ?? "")} />
            </div>
            <div
                className="w-full sm:w-2/3 sm:h-full pr-2 pl-2 sm:pl-10"
            >
                <RatingLine
                    className="w-1/3 my-2 float-right"
                    score={props.product ? props.product.rating : 0}
                    starSize={25}
                />
                <Hr />
                <div
                    className="clear-right [&>*]:my-2"
                >
                    <h2 className="text-2xl font-medium">
                        {props.product?.name}
                    </h2>
                    <p>
                        <b>Nhãn hàng:</b> {props.product?.brand}
                    </p>
                    <p>
                        {props.product?.description}
                    </p>
                    <p className="text-[#e42f2f] font-medium">
                        {props.product ? (props.product.price * amount).toLocaleString() : 0} VNĐ
                    </p>

                    <div className="flex [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                        <Button
                            className="h-8 w-8 rounded-none"
                            onClick={() => setAmount(Math.max(amount - 1, 1))}
                        >
                            -
                        </Button>
                        <input 
                            className="h-8 w-10 text-center text-white rounded-none bg-[#b22626]"
                            type="text"
                            value={amount}
                            onChange={(e) => { 
                                let newNumber = Number(e.target.value);
                                newNumber = Number.isNaN(newNumber) ? 1 : newNumber;
                                setAmount(Math.max(newNumber, 1));
                            }}
                        />
                        <Button 
                            className="h-8 w-8 rounded-none"
                            onClick={() => setAmount(amount + 1)}
                        >
                            +
                        </Button>
                        
                        <Button 
                            className="w-max py-[0.1rem] ml-7 rounded-3xl"
                            onClick={handleClickAddToCart}
                        >
                            Thêm vào giỏ hàng
                        </Button>

                    </div>
                    <div
                        className={combineClassnames(
                            "ml-2"
                        )}
                    >
                        <Switch>
                            <Match when={cartStatus === "error"}>
                                <span className="text-[#c70039] flex items-center">
                                <ErrorIcon className="mr-2" size={30} />
                                Đã có lỗi xảy ra
                                </span>
                            </Match>
                            
                            <Match when={cartStatus === "success"}>
                                <span className="text-[#50c878] flex items-center">
                                <SuccessIcon className="mr-2" size={30} />
                                Đã thêm vào&nbsp; <Link className="underline hover:text-[#317a49]" to="/cart">giỏ hàng</Link>
                                </span>
                            </Match>

                            <Match when={cartStatus === "neutral"}>
                                <img className="w-[26px] h-[26px] m-2" src={loading}/>
                            </Match>
                        </Switch>
                    </div>
                </div> {/* End of detail */}
            </div> {/* End of right hand container */}
        </div>
    );
});

export default ProductDetail;