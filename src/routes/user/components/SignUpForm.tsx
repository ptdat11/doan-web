import React, { useState } from "react";
import ModalForm from "../../../components/form/ModalForm";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { registerPOST } from "../../../interfaces/api-formats/register";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../../states/system-states";
import { jsonFetch } from "../../../submodules/networking/jsonFetch";
import { InputPromptInfo } from "../../../submodules/prompt/prompt-info";
import useSignIn from "../../../hooks/useSignIn";

interface Props extends BaseProps {
    isShowing?: boolean,
    onNavigateSignIn?: React.MouseEventHandler<HTMLAnchorElement>
}

const SignUpForm: React.FC<Props> = React.memo((props) => {
    const [customer, setCustomer] = useState({
        username: "",
        email: "abc@gmail.com",
        password: "",
    });
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("VN");

    const registerApiUrl = useRecoilValue(apiUrlSelector("register"));
    const signInCallback = useSignIn();

    const [usernamePrompt, setUsernamePrompt] = useState<InputPromptInfo>({
        state: "neutral",
        content: undefined
    });
    const [namePrompt, setNamePrompt] = useState<InputPromptInfo>({
        state: "neutral",
        content: undefined
    });
    const [passwordPrompt, setPasswordPrompt] = useState<InputPromptInfo>({
        state: "neutral",
        content: undefined
    });
    const [phoneNumberPrompt, setPhoneNumberPrompt] = useState<InputPromptInfo>({
        state: "neutral",
        content: undefined
    })

    const handleUsernameBlur = () => {

    };

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (Object.values(customer).includes("") || []) {

        }

        const data: registerPOST = {
            user: customer,
            name: name,
            phone_number: phoneNumber,
            address: address
        }

        let response = await jsonFetch(registerApiUrl, "POST", data);
        if (response.status !== 201) {
            return;
        }

        await signInCallback({
            username: customer.username,
            password: customer.password
        });

        window.location.reload();
    };

    return (
        <ModalForm
            isShowing={props.isShowing}
            title="Đăng ký"
            textFields={[
                { 
                    label: "Tên đăng nhập",
                    value: customer.username,
                    prompt: usernamePrompt,
                    onChange: (e) => setCustomer({ ...customer, username: e.target.value }),
                    onBlur: handleUsernameBlur,
                },
                {
                    label: "Họ tên",
                    value: name,
                    onChange: (e) => setName(e.target.value)
                },
                // {
                //     label: "Email",
                //     type:"email",
                //     value: customer.email,
                //     onChange: (e) => setCustomer({ ...customer, email: e.target.value })
                // },
                {
                    label: "Mật khẩu",
                    type: "password",
                    value: customer.password,
                    onChange: (e) => setCustomer({ ...customer, password: e.target.value })
                },
                {
                    label: "Số điện thoại",
                    value: phoneNumber,
                    onChange: (e) => setPhoneNumber(e.target.value )
                },
                // {
                //     label: "Địa chỉ",
                //     value: address,
                //     onChange: (e) => setAddress(e.target.value)
                // }
            ]}
            button={{
                label: "Đăng ký",
                onClick: handleSignUp
            }}
            smallBottomInfo={
                <>
                    Đã có tài khoản?&nbsp;
                    <a
                        className="text-[#e42f2f]"
                        href=""
                        onClick={props.onNavigateSignIn}
                    >
                        Đăng nhập
                    </a>
                </>
            }
        />
    );
});

export default SignUpForm;