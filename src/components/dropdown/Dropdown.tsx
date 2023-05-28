import React, { useState, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
	label?: React.ReactNode,
	width?: "w-full" | "w-max"
}

const Dropdown: React.FC<Props> = React.memo((props) => {
	const [expanded, setExpanded] = useState(false);
	const containerRef = useRef<HTMLElement>(null);

	return (
		<section
			ref={containerRef}
			className={combineClassnames(
				props.className,
				"relative flex flex-col"
			)}
		>
			<label 
				className="w-full flex items-center justify-between cursor-pointer"
			>
				{props.label}
				<button
					className="w-fit p-0 bg-transparent"
					onClick={() => setExpanded(!expanded)}
				>
					<svg 
						className={combineClassnames(
							"duration-200 fill-white",
							expanded ? "rotate-180" : ""
						)} width="24" height="24" viewBox="0 0 24 24"
					>
							<path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z" />
					</svg>
				</button>
			</label>

			<div 
				className={combineClassnames(
					expanded ? "" : "scale-y-0 h-0",
					props.width,
					"absolute left-0 origin-top duration-100 rounded-md bg-inherit"
				)}
				style={{
					top: containerRef.current?.offsetHeight
				}}
			>
					{props.children}
			</div>
		</section>
	);
});

export default Dropdown;