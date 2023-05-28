import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface ArrowProps extends BaseProps {
    direction?: "up" | "down" | "left" | "right",
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    size?: number
  }
  const ArrowButton: React.FC<ArrowProps> = React.memo((props) => {
    let rot: string;
    let btnSize = props.size ? props.size : 40;
    switch (props.direction) {
      case "up":
        rot = "rotate-90";
        break;
      case "down":
        rot = "-rotate-90";
        break;
      case "right":
        rot = "rotate-180";
        break;
      default:
        rot = "";
    };
  
    return (
      <button
        className={combineClassnames(
          props.className,
          "h-fit w-fit p-0 rounded-full bg-[#ffffff44] duration-100 active:bg-[#ffffff99]"
        )}
        style={{...props.style}}
        onClick={props.onClick}
      >
        <svg className={combineClassnames(rot)} xmlns="http://www.w3.org/2000/svg" width={btnSize} height={btnSize} viewBox="0 0 24 24">
          <g>
            <polyline fill="none" id="Left" points="15.5 5 8.5 12 15.5 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </g>
        </svg>
      </button>
    );
  });

  export default ArrowButton;