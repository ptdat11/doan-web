import React, { useState } from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import LocalStorage from "../../submodules/local-storage/local-storage";
import Modal from "../../components/modal/Modal";
import SignInForm from "../../components/form/SignInForm";
import SignUpForm from "../../components/form/SignUpForm";
import Switch from "../../components/flow-control/switch/Switch";
import Match from "../../components/flow-control/switch/Match";

type FormTypeValue = "none" | "signin" | "signup";

interface Props extends BasePropsPage {}

const UserPage = React.memo((props: Props) => {
    let initVal: FormTypeValue = LocalStorage.get<string>("userid") ? "none" : "signin";
    const [formType, setFormType] = useState<FormTypeValue>(initVal);
    console.log(initVal, "none");

    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            title="User Profile"
        >
            <Modal 
                isShowing={formType !== "none"} 
                // onClick={(e) => {
                //     e.preventDefault();
                //     setFormType("none");
                // }}
            >
                <Switch>
                    <Match when={formType === "signin"}>
                        <SignInForm 
                            onNavigateSignUp={(e) => {
                                e.preventDefault();
                                setFormType("signup");
                            }}
                        />
                    </Match>

                    <Match when={formType === "signup"}>
                        <SignUpForm 
                            onNavigateSignIn={(e) => {
                                e.preventDefault();
                                setFormType("signin");
                            }}
                        />
                    </Match>
                </Switch>
            </Modal>
        </PageLayout>
    );
});

export default UserPage;