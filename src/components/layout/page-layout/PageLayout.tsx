import React from "react";
import { BasePropsPage } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { headerHeight } from "../../../variables.css";

interface Props extends BasePropsPage {
    title?: string
}

const PageLayout: React.FC<Props> = React.memo((props) => {
	return (
		<div
			id={props.id}
			className={combineClassnames(
				props.className,
				"text-lg flex flex-col"
			)}
			style={{
				...props.style,
				minHeight: window.innerHeight - headerHeight
			}}
		>
			<h1 className="h-16 text-2xl p-3 px-5">{props.title}</h1>
			{props.children}
		</div>
	)
});

export default PageLayout;