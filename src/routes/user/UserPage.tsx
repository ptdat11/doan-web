import React, { useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import LocalStorage from "../../submodules/local-storage/local-storage";
import SignInForm from "./components/SignInForm";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";
import SignUpForm from "./components/SignUpForm";
import { JwtTokenPair } from "../../interfaces/api-formats/login";
// import useProfile from "../../hooks/useProfile";
import useRefreshToken from "../../hooks/useRefreshToken";
import useFetch from "../../hooks/useFetch";
import { profileGET } from "../../interfaces/api-formats/profile";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../states/system-states";
import useProfile from "../../hooks/useProfile";

type FormTypeValue = "none" | "signin" | "signup";

interface Props extends BasePropsPage {}

const UserPage = React.memo((props: Props) => {
    const accessToken = useRefreshToken();
    const localJwt = LocalStorage.get<JwtTokenPair>("jwt");

    let initVal: FormTypeValue = localJwt ? "none" : "signin";
    const [formType, setFormType] = useState<FormTypeValue>(initVal);

    const profileApiUrl = useRecoilValue(apiUrlSelector("profile"));
    // const profile = useFetch<profileGET>({
    //     url: profileApiUrl,
    //     method: "GET",
    //     headers: {
    //         "Authorization": "Bearer " + accessToken
    //     }
    // }, []);
    const profile = useProfile();
    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            title={`Hello ${profile?.name}`}
        >
            <Switch>
                <Match when={formType === "signin"}>
                    <SignInForm 
                        isShowing
                        onNavigateSignUp={(e) => {
                            e.preventDefault();
                            setFormType("signup");
                        }}
                    />
                </Match>

                <Match when={formType === "signup"}>
                    <SignUpForm
                        isShowing
                        onNavigateSignIn={(e) => {
                            e.preventDefault();
                            setFormType("signin");
                        }}
                    />
                </Match>
            </Switch>
        </PageLayout>
    );
});

export default UserPage;