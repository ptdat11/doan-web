import React from "react";
import { BasePropsPage } from "../../../submodules/base-props/base-props";
import Header from "../../header/Header";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { Outlet } from "react-router-dom";

interface Props extends BasePropsPage {}

const FullWidthLayout: React.FC<Props> = React.memo((props) => {
    return (
        <div
            id={props.id}
            className={combineClassnames(
                props.className,
                "w-screen h-screen"
            )}
            style={{...props.style}}
        >
            <Header />
            <Outlet />
        </div>
    );
});

export default FullWidthLayout;