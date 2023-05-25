import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { footerHeight } from "../../variables.css";

interface Props extends BaseProps {}

const Footer: React.FC<Props> = React.memo((props) => {
	return (
		<footer
			className={combineClassnames(
				props.className,
				"bg-black text-white mt-auto"
			)}
			style={{
				...props.style,
        height: footerHeight
			}}
		>
			{props.children}
		</footer>
	);
});

export default Footer;