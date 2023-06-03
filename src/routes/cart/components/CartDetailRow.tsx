import React from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { imgUrl } from "../../../states/system-states";
import { CartDetail } from "../../../interfaces/cart-detail";
import { Link } from "react-router-dom";

interface Props extends BaseProps {
    detail: CartDetail,
    onClickDelete?: React.MouseEventHandler<HTMLSpanElement>
}

const CartDetailRow: React.FC<Props> = React.memo((props) => {

    return (
        <div
            className={combineClassnames(
                props.className,
                "min-h-[4rem] my-5 flex justify-between items-center"
            )}
            style={{...props.style}}
        >
            <div className="h-full w-1/12 overflow-hidden">
                <img className="max-h-[4rem]" src={imgUrl(props.detail.product.image_public_id)} />
            </div>
            <Link 
                className="w-2/5 font-bold hover:text-[#646cff]"
                to={`/product/${props.detail.product.id}`}
            >
                <span>{props.detail.product.name}</span>
            </Link>
            <span>{props.detail.quantity}</span>
            <span className="w-3/12 text-center">{props.detail.sub_price.toLocaleString()} VNĐ</span>
            <span 
                className="underline hover:text-[#e42f2f] cursor-pointer"
                onClick={props.onClickDelete}
            >
                Xóa
            </span>
        </div>
    );
});

export default CartDetailRow;