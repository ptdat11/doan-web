import React from 'react'
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    backgroundColor?: string,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<Props> = React.memo((props) => {
    return (
        <button
            className={combineClassnames(
                props.disabled ? "opacity-60 pointer-events-none" : undefined,
                "text-white text-base md:text-lg px-3 bg-[#e42f2f] active:bg-[#b62626]",
                props.className,
            )}
            style={{
                ...props.style,
                backgroundColor: props.backgroundColor
            }}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
});

export default Button;