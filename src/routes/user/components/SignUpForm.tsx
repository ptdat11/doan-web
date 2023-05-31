import React, { useState } from "react";
import ModalForm from "../../../components/form/ModalForm";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { registerPOST } from "../../../interfaces/api-formats/register";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../../states/system-states";
import { jsonFetch } from "../../../submodules/networking/jsonFetch";
import { InputPromptInfo } from "../../../submodules/prompt/prompt-info";
import useSignIn from "../../../hooks/useSignIn";
import LocalStorage from "../../../submodules/local-storage/local-storage";
import { JwtTokenPair } from "../../../interfaces/api-formats/login";

interface Props extends BaseProps {
    isShowing?: boolean,
    onNavigateSignIn?: React.MouseEventHandler<HTMLAnchorElement>
}

const SignUpForm: React.FC<Props> = React.memo((props) => {
    const [user, setCustomer] = useState({
        username: "",
        email: "abc@gmail.com",
        password: "",
    });
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("VN");

    const registerApiUrl = useRecoilValue(apiUrlSelector("register"));
    const loginApiUrl = useRecoilValue(apiUrlSelector("login"));
    const validateUsernameApiUrl = useRecoilValue(apiUrlSelector("validate-username"))
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

    const handleUsernameBlur = async () => {
        if (user.username === "")
            return;
        
        const validateData = {
            username: user.username
        }
        const response = await jsonFetch(validateUsernameApiUrl, "POST", validateData);
        console.log(response);
    };

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUsernamePrompt({ state: "neutral", content: undefined });
        setNamePrompt({ state: "neutral", content: undefined });
        setPasswordPrompt({ state: "neutral", content: undefined });
        setPhoneNumberPrompt({ state: "neutral", content: undefined });

        if (Object.values(user).includes("")) {
            if (user.username === "")
                setUsernamePrompt({ state: "error", content: "Hãy nhập tên đăng nhập" });
            if (user.password === "")
                setPasswordPrompt({ state: "error", content: "Hãy nhập mật khẩu" });
            if (name === "")
                setNamePrompt({ state: "error", content: "Hãy nhập tên người dùng" });
            if (phoneNumber === "")
                setPhoneNumberPrompt({ state: "error", content: "Hãy nhập số điện thoại" });
            return;
        }

        const data: registerPOST = {
            user: user,
            name: name,
            phone_number: phoneNumber,
            address: address
        }

        let response = await jsonFetch(registerApiUrl, "POST", data);
        switch (response.status) {
            case 201:
                break;
            default:
                setUsernamePrompt({ state: "error", content: undefined });
                setNamePrompt({ state: "error", content: undefined });
                setPasswordPrompt({ state: "error", content: undefined });
                setPhoneNumberPrompt({ state: "error", content: "Đã xảy ra lỗi" });
                return;
        }

        const jwtLogin = await jsonFetch<JwtTokenPair>(loginApiUrl, "POST", {
            username: user.username,
            password: user.password
        });

        LocalStorage.set("jwt", jwtLogin.data);
        window.location.reload();
    };

    return (
        <ModalForm
            isShowing={props.isShowing}
            title="Đăng ký"
            textFields={[
                { 
                    label: "Tên đăng nhập",
                    value: user.username,
                    prompt: usernamePrompt,
                    onChange: (e) => setCustomer({ ...user, username: e.target.value }),
                    onBlur: handleUsernameBlur,
                },
                {
                    label: "Họ tên",
                    value: name,
                    prompt: namePrompt,
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
                    value: user.password,
                    prompt: passwordPrompt,
                    onChange: (e) => setCustomer({ ...user, password: e.target.value })
                },
                {
                    label: "Số điện thoại",
                    value: phoneNumber,
                    prompt: phoneNumberPrompt,
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