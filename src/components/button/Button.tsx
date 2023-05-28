import React from 'react'
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<Props> = React.memo((props) => {
    return (
        <button
            className={combineClassnames(
                props.className,
                "text-white text-base md:text-lg px-3 bg-[#e42f2f] active:bg-[#b62626]"
            )}
            style={{...props.style}}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
});

export default Button;