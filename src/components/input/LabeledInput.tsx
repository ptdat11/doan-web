import React, { HTMLInputTypeAttribute, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { InputPromptInfo } from "../../submodules/prompt/prompt-info";

export interface LabeledInputProps extends BaseProps {
    label?: string,
    inputClassName?: string,
    type?: HTMLInputTypeAttribute,
    value?: string | number | readonly string[],
    prompt?: InputPromptInfo,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const LabeledInput: React.FC<LabeledInputProps> = React.memo((props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    let borderColor: string = "";
    let promptColor: string = "";

    switch (props.prompt?.state) {
        case "error":
            borderColor = "border-2 border-[#dc2626]";
            promptColor = "text-[#dc2626]";
            break;
        case "success":
            borderColor = "border-2 border-[#84cc16]";
            promptColor = "text-[#84cc16]";
            break;
        case "warning":
            borderColor = "border-2 border-[#facc15]";
            promptColor = "text-[#facc15]"
            break;
    }

    return (
        <label
            className={combineClassnames(
                props.className,
            )}
            style={{
                ...props.style,
                maxWidth: inputRef.current ? inputRef.current.offsetWidth : undefined
            }}
        >
            {props.label}
            <br />
            <input 
                ref={inputRef}
                className={combineClassnames(
                    props.inputClassName,
                    borderColor,
                    "mt-1 p-1 bg-[#d9d9d9] rounded-lg"
                )}
                type={props.type}
                value={props.value}
                onKeyDown={props.onKeyDown}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            <br />
            <span className={combineClassnames(
                promptColor,
                "break-words"
            )}>{props.prompt?.content}</span>
        </label>
    );
});

export default LabeledInput;