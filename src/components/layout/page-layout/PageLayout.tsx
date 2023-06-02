import React from "react";
import { BasePropsPage } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { headerHeight } from "../../../variables.css";

interface Props extends BasePropsPage {
    title?: string,
	backgroundColor?: string
}

const PageLayout: React.FC<Props> = React.memo((props) => {
	return (
		<div
			id={props.id}
			className={combineClassnames(
				props.className,
				"w-full text-lg flex flex-col"
			)}
			style={{
				...props.style,
				minHeight: window.innerHeight - headerHeight,
				backgroundColor: props.backgroundColor
			}}
		>
			<h1 className="min-h-[4rem] text-2xl p-3 px-5 font-medium">{props.title}</h1>
			{props.children}
		</div>
	)
});

export default PageLayout;