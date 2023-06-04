import React from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { ordersGET } from "../../../interfaces/api-formats/orders";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import ArrowButton from "../../../components/button/ArrowButton";

interface Props extends BaseProps {
    record: ordersGET
}

const OrderHistoryRecord: React.FC<Props> = React.memo((props) => {
    let date = new Date(props.record.created_at);

    return (
        <div
            className={combineClassnames(
                props.className,
                "w-11/12 p-4 my-4 rounded-xl bg-[#eeeeeecc] flex items-center justify-between hover:text-[#e42f2f] active:bg-[#eeeeee] cursor-pointer"
            )}
            style={{...props.style}}
        >
            <span>{date.toLocaleString()}</span>
            <ArrowButton size={17} direction="right" />
        </div>
    );
});

export default OrderHistoryRecord;