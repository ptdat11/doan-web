import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    size: number
}

const WarningIcon: React.FC<Props> = React.memo((props) => {
    return (
        <svg 
            className={combineClassnames(
                props.className
            )}
            style={{...props.style}}
            xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none"
        >
            <path d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffc300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
});

export default WarningIcon;