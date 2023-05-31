import React, { useState, useRef, useEffect } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import Show from "../flow-control/if/Show";

interface Props extends BaseProps {
	label?: React.ReactNode,
	width?: "w-full" | "w-max",
	showCaret?: boolean,
	top?: number,
	align?: "center" | "left" | "right"
}

const Dropdown: React.FC<Props> = React.memo((props) => {
	const [expanded, setExpanded] = useState(false);
	const containerRef = useRef<HTMLElement>(null);
	const itemRef = useRef<HTMLDivElement>(null);
	let top = props.top ? props.top : 0;

	useEffect(() => {
		if (props.align === "center" && itemRef.current && containerRef.current) {
			const item = itemRef.current;
			const container = containerRef.current;

			item.style.left = (container.offsetWidth - item.offsetWidth) / 2 + "px";
		}
	}, []);

	useEffect(() => {
		if (!expanded)
			return;
		
		const onDocClick = (e: MouseEvent) => {
			const inside = containerRef.current?.contains(e.target as Node);
			if (!inside)
				setExpanded(false);
		};
		document.addEventListener("click", onDocClick);

		return () => document.removeEventListener("click", onDocClick);
	}, [expanded]);

	return (
		<section
			ref={containerRef}
			className={combineClassnames(
				props.className,
				"relative flex flex-col"
			)}
			style={{...props.style}}
		>
			<label 
				className="w-full flex items-center justify-between cursor-pointer"
			>
				{props.label}
				<button
					onClick={(e) => {
						setExpanded(!expanded);
					}}
					className={combineClassnames(
						props.showCaret ? undefined : "hidden",
						"w-fit p-0 bg-transparent"
					)}
				>
					<svg 
						className={combineClassnames(
							"duration-200 fill-white",
							expanded ? "rotate-180" : ""
						)} 
						width="24" height="24" viewBox="0 0 24 24"
					>
						<path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z" />
					</svg>
				</button>
			</label>

			<div 
				ref={itemRef}
				className={combineClassnames(
					expanded ? "" : "scale-y-0 h-0",
					props.align === "left" ? "right-0" : (props.align === "right" ? "left-0" : undefined),
					props.width,
					"absolute z-1 w-max origin-top duration-100 rounded-md bg-inherit"
				)}
				style={{
					top: containerRef.current ? containerRef.current.offsetHeight + top : undefined,
				}}
			>
					{props.children}
			</div>
		</section>
	);
});

export default Dropdown;