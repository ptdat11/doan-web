import React from "react";
import { BasePropsPage } from "../../submodules/base-props/base-props";
import PageLayout from "../../components/layout/page-layout/PageLayout";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BasePropsPage {}

const ErrorPage = React.memo((props: Props) => {
    return (
        <PageLayout
            id={props.id}
            className={combineClassnames(
                props.className,
                "w-screen font-bold justify-center items-center"
            )}
            style={{...props.style}}
            title="404 Not Found"
        >
        </PageLayout>
    );
});

export default ErrorPage;