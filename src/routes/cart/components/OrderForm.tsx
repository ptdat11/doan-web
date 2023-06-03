import React, { useEffect, useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import ModalForm from "../../../components/form/ModalForm";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import useProfile from "../../../hooks/useProfile";

interface Props extends BaseProps {
    isShowing?: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClickOrder?: React.MouseEventHandler<HTMLButtonElement>
};

const OrderForm: React.FC<Props> = React.memo((props) => {
    const profile = useProfile();
    const [address, setAddress] = useState<string>("");
    useEffect(() => {
        if (profile) {
            setAddress(profile.address ?? "");
        }
    }, []);

    return (
        <ModalForm
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            isShowing={props.isShowing}
            title="Đặt hàng"
            onClick={props.onClick}
            textFields={[
                {
                    label: "Tên người nhận",
                    value: profile?.name ?? "",
                    disabled: true,
                    onChange: () => {}
                },
                {
                    label: "Số điện thoại",
                    value: profile?.phone_number ?? "",
                    disabled: true,
                    onChange: () => {}
                },
                {
                    label: "Địa chỉ",
                    value: address,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)
                }
            ]}
            button={{
                label: "Xác nhận",
                onClick: props.onClickOrder
            }}
        />
    );
});

export default OrderForm;