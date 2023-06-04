import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    size: number,
    onClick: React.MouseEventHandler<HTMLButtonElement>
};

const CloseButton: React.FC<Props> = React.memo((props) => {
    return (
        <button
            className={combineClassnames(
                props.className,
                "w-fit p-1 rounded-full bg-transparent hover:bg-[#e42f2f] group"
            )}
            style={{...props.style}}
            onClick={props.onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none">
            <path className="group-hover:stroke-white" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    );
});

export default CloseButton;