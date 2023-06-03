import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    size: number
}

const ErrorIcon: React.FC<Props> = React.memo((props) => {
    return (
        <svg 
            className={combineClassnames(
                props.className,
            )}
            style={{...props.style}}
            xmlns="http://www.w3.org/2000/svg" fill="#c70039" height={props.size} width={props.size} viewBox="-40 -40 595 595"
        >
            <path d="M437.016,74.984c-99.979-99.979-262.075-99.979-362.033,0.002c-99.978,99.978-99.978,262.073,0.004,362.031     c99.954,99.978,262.05,99.978,362.029-0.002C536.995,337.059,536.995,174.964,437.016,74.984z M406.848,406.844     c-83.318,83.318-218.396,83.318-301.691,0.004c-83.318-83.299-83.318-218.377-0.002-301.693     c83.297-83.317,218.375-83.317,301.691,0S490.162,323.549,406.848,406.844z"/>
            <path d="M361.592,150.408c-8.331-8.331-21.839-8.331-30.17,0l-75.425,75.425l-75.425-75.425c-8.331-8.331-21.839-8.331-30.17,0     s-8.331,21.839,0,30.17l75.425,75.425L150.43,331.4c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0     l75.397-75.397l75.419,75.419c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17l-75.419-75.419l75.425-75.425     C369.923,172.247,369.923,158.74,361.592,150.408z"/>
        </svg>
    );
});

export default ErrorIcon;