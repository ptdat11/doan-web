import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import ModalForm from "../../../components/form/ModalForm";
import { InputPromptInfo } from "../../../submodules/prompt/prompt-info";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../../states/system-states";
import { jsonFetch } from "../../../submodules/networking/jsonFetch";
import { JwtTokenPair } from "../../../interfaces/api-formats/login";
import LocalStorage from "../../../submodules/local-storage/local-storage";

interface Props extends BaseProps {
    isShowing?: boolean,
    onNavigateSignUp?: React.MouseEventHandler<HTMLAnchorElement>
}

const SignInForm: React.FC<Props> = React.memo((props) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const loginApiUrl = useRecoilValue(apiUrlSelector("login"));
    const [usernamePrompt, setUsernamePrompt] = useState<InputPromptInfo>({
        state: "neutral",
        content: undefined
    });
    const [passwordPrompt, setPasswordPrompt] = useState<InputPromptInfo>({
        state: "neutral",
        content: undefined
    });

    const handleKeyDown = async(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            await handleSignIn();
            e.currentTarget.blur();
        }
    };

    const handleSignIn = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        setUsernamePrompt({ state: "neutral", content: undefined });
        setPasswordPrompt({ state: "neutral", content: undefined });

        if (Object.values(user).includes("")) {
            if (user.username === "")
                setUsernamePrompt({ state: "error", content: "Hãy nhập username" });
            if (user.password === "")
                setPasswordPrompt({ state: "error", content: "Hãy nhập mật khẩu"});
            return;
        }

        const response = await jsonFetch<JwtTokenPair>(loginApiUrl, "POST", user);

        switch (response.status) {
            case 400:
                setUsernamePrompt({ state: "error", content: undefined });
                setPasswordPrompt({ state: "error", content: "Tên đăng nhập hoặc mật khẩu chưa đúng"});
                break;
            case 200:
                LocalStorage.set("jwt", response.data);
                window.location.reload();
                break;
            default:
                setUsernamePrompt({ state: "error", content: undefined });
                setPasswordPrompt({ state: "error", content: "Đã xảy ra lỗi" });
        }
    };

    return (
        <ModalForm
            isShowing={props.isShowing}
            title="Đăng nhập" 
            textFields={[
                {
                    label: "Tên đăng nhập",
                    value: user.username,
                    prompt: usernamePrompt,
                    onChange: (e) => setUser({ ...user, username: e.target.value })
                },
                {
                    label: "Mật khẩu",
                    type: "password",
                    value: user.password,
                    prompt: passwordPrompt,
                    onKeyDown: handleKeyDown,
                    onChange: (e) => setUser({ ...user, password: e.target.value})
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
        /> // End ModalForm
    );
});

export default SignInForm;