import React, { useEffect, useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import SignInForm from "./components/SignInForm";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";
import SignUpForm from "./components/SignUpForm";
import useRefreshToken from "../../hooks/useRefreshToken";
import UserInfo from "./components/UserInfo";

type FormTypeValue = "none" | "signin" | "signup";

interface Props extends BasePropsPage {}

const UserPage = React.memo((props: Props) => {
    const accessToken = useRefreshToken();

    const [formType, setFormType] = useState<FormTypeValue>("none");

    useEffect(() => {
        let initVal: FormTypeValue = accessToken ? "none" : "signin";
        setFormType(initVal);
    }, []);
    
    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            <Switch>
                <Match when={formType === "none"}>
                    <UserInfo />
                </Match>
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