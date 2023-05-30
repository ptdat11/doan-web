import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import ModalForm from "../../../components/form/ModalForm";
import useSignIn from "../../../hooks/useSignIn";

interface Props extends BaseProps {
    isShowing?: boolean,
    onNavigateSignUp?: React.MouseEventHandler<HTMLAnchorElement>
}

const SignInForm: React.FC<Props> = React.memo((props) => {
    const [customer, setCustomer] = useState({
        username: "",
        password: ""
    });
    const signInCallback = useSignIn();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            handleSignIn();
            e.currentTarget.blur();
        }
    };

    const handleSignIn = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        await signInCallback(customer);

        window.location.reload();
    };

    return (
        <ModalForm
            isShowing={props.isShowing}
            title="Đăng nhập" 
            textFields={[
                {
                    label: "Tên đăng nhập",
                    value: customer.username,
                    onChange: (e) => setCustomer({ ...customer, username: e.target.value })
                },
                {
                    label: "Mật khẩu",
                    type: "password",
                    value: customer.password,
                    onKeyDown: handleKeyDown,
                    onChange: (e) => setCustomer({ ...customer, password: e.target.value})
                }
            ]}
            button={{
                label: "Đăng nhập",
                onClick: handleSignIn
            }}
            smallBottomInfo={
                <>
                    Chưa có tài khoản?&nbsp;
                    <a
                        className="text-[#e42f2f]"
                        href=""
                        onClick={props.onNavigateSignUp}
                    >
                        Đăng ký ngay
                    </a>
                </>
            }
        />
    );
});

export default SignInForm;