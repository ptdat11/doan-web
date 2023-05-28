import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import Button from "../button/Button";
import LabeledInput from "../form-input/Input";

interface Props extends BaseProps {
    onSignIn?: React.MouseEventHandler<HTMLButtonElement>,
    onNavigateSignUp?: React.MouseEventHandler<HTMLAnchorElement>
}

const SignInForm: React.FC<Props> = React.memo((props) => {
    return (
        <form className="px-12 py-4 text-base flex flex-col items-center rounded-lg bg-white">
            <h2 className="m-2 text-2xl text-center font-semibold">Đăng nhập</h2>

            <LabeledInput
                className="block my-2"
                inputClassName="w-72"
            >
                Tên đăng nhập
            </LabeledInput>

            <LabeledInput
                className="block my-2"
                inputClassName="w-72"
            >
                Mật khẩu
            </LabeledInput>

            <Button
                className="py-1 px-8 rounded-xl my-5 font-light text-lg"
                onClick={props.onSignIn}
            >
                Đăng nhập
            </Button>

            <p>
                Chưa có tài khoản? <a 
                    className="text-[#e42f2f]"
                    href=""
                    onClick={props.onNavigateSignUp}
                >
                    Đăng ký ngay
                </a>
            </p>
        </form>
    );
});

export default SignInForm;