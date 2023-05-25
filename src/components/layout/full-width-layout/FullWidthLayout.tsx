import React from "react";
import { BasePropsPage } from "../../../submodules/base-props/base-props";
import Header from "../../header/Header";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { Outlet } from "react-router-dom";
import { headerHeight } from "../../../variables.css";

interface Props extends BasePropsPage {}

const FullWidthLayout: React.FC<Props> = React.memo((props) => {
	console.log(document.body.getBoundingClientRect().width)
	return (
		<div
			id={props.id}
			className={combineClassnames(
				props.className,
				"h-screen w-screen overflow-y-scroll"
			)}
			style={{...props.style}}
		>
			<Header className="z-10" />
			<div
				className="w-full relative"
				style={{top: headerHeight}}
			>
				<Outlet />
			</div>
		</div>
	);
});

export default FullWidthLayout;