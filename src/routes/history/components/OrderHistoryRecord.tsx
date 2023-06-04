import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { ordersGET } from "../../../interfaces/api-formats/orders";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import ArrowButton from "../../../components/button/ArrowButton";
import Modal from "../../../components/modal/Modal";
import For from "../../../components/flow-control/for/For";
import { Link } from "react-router-dom";
import Hr from "../../../components/hr/Hr";
import CloseButton from "../../../components/button/CloseButton";

interface Props extends BaseProps {
    record: ordersGET
}

const OrderHistoryRecord: React.FC<Props> = React.memo((props) => {
    const [showingDetails, setShowingDetails] = useState(false);
    let date = new Date(props.record.created_at);

    return (
        <>
        <Modal
            className="z-30"
            isShowing={showingDetails}
            onClick={() => setShowingDetails(false)}
        >
            <div
                className="sm:max-w-[90%] mx-auto p-3 sm:p-7 flex flex-col rounded-xl bg-white"
            >
                <CloseButton 
                    className="ml-auto"
                    size={20}
                    onClick={() => setShowingDetails(false)}
                />
                <For each={props.record.OrderDetails}>
                    {(detail, index) =>
                    <>
                    <div
                        key={index}
                        className="w-full my-3 flex justify-between items-center [&>*]:my-3"
                    >
                        <Link 
                            className="w-7/12 sm:w-3/5 hover:text-[#747bff]"
                            to={`/product/${detail.product.id}`}
                        >
                            <span className="font-bold">
                                {detail.product.name}
                            </span>
                        </Link>
                        <span className="mx-3">
                            {detail.quantity}
                        </span>
                        <span className="w-1/4">
                            {detail.sub_price.toLocaleString()} VNĐ
                        </span>
                    </div>
                    <Hr />
                    </>
                    }
                </For>
                <div className="mb-4 mt-7">
                    <b>Tổng: </b><output className="font-medium text-[#e42f2f]">{props.record.total_price.toLocaleString()} VNĐ</output>
                </div>
            </div>
        </Modal>

        <div
            className={combineClassnames(
                props.className,
                "w-11/12 p-4 my-4 rounded-xl bg-[#eeeeeecc] flex items-center justify-between hover:text-[#e42f2f] active:bg-[#eeeeee] cursor-pointer"
            )}
            style={{...props.style}}
            onClick={() => setShowingDetails(true)}
        >
            <span>{date.toLocaleString()}</span>
            <ArrowButton size={17} direction="right" />
        </div>
        </>
    );
});

export default OrderHistoryRecord;