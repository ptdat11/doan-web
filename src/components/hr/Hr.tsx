import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {}

const Hr: React.FC<Props> = React.memo((props) => {
    return (
        <hr 
            className={combineClassnames(
                props.className,
                "mx-auto w-11/12 border-gray-500"
            )}
        />
    );
});

export default Hr;