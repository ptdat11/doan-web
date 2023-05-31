import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    size?: number,
    onClick?: React.MouseEventHandler<HTMLDivElement>
};

const DefaultAvatar: React.FC<Props> = React.memo((props) => {
    return (
        <div
            className={combineClassnames(
                props.className,
                "rounded-full bg-[#aaaaaa] flex items-center justify-center"
            )}
            style={{
                ...props.style,
                width: props.size,
                height: props.size
            }}
            onClick={props.onClick}
        >
            <svg className="w-10/12 h-5/6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0" fill="#ffffff"/>
            </svg>
        </div>
    );
});

export default DefaultAvatar;