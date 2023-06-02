import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {}

const ErrorPrompt: React.FC<Props> = React.memo((props) => {
    return (
        <h1
            className={combineClassnames(
                props.className,
                "font-bold text-2xl"
            )}
            style={{...props.style}}
        >
            Đã xảy ra lỗi
        </h1>
    );
});

export default ErrorPrompt;