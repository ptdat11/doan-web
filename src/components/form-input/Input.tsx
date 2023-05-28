import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    inputClassName?: string,
    value?: string | number,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const LabeledInput: React.FC<Props> = React.memo((props) => {
    return (
        <label
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
        >
            {props.children}
            <br />
            <input 
                className={combineClassnames(
                    props.inputClassName,
                    "mt-1 p-1 bg-[#d9d9d9] rounded-lg"
                )}
                type="text" 
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    );
});

export default LabeledInput;