import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { productGET } from "../../../interfaces/api-formats/product";
import { imgUrl } from "../../../states/system-states";
import RatingLine from "../../../components/product/RatingLine";
import Hr from "../../../components/hr/Hr";
import Button from "../../../components/button/Button";
import combineClassnames from "../../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    product?: productGET | null
}

const ProductDetail: React.FC<Props> = React.memo((props) => {
    const [amount, setAmount] = useState(1);

    const handleClickAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {

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
                </div>
            </div>
        </div>  
    );
});

export default ProductDetail;