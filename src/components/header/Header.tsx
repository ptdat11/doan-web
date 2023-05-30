import React, { useState } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { headerHeight } from "../../variables.css";
import { Link, useNavigate } from "react-router-dom";
import FullWidthNav from "./components/FullWidthNav";
import DropdownNav from "./components/DropdownNav";

interface Props extends BaseProps {}

const Header: React.FC<Props> = React.memo((props) => {
	const [expanded, setExpanded] = useState(false);
	const navigate = useNavigate();

	const handleClickSearch = () => {
		console.log("search");
	};

	const handleClickSignIn = () => {
		navigate("/user");
	};

	return (
		<header
			className={combineClassnames(
					props.className,
					"w-screen fixed bg-black items-center"
			)}
			style={{
				...props.style,
				height: headerHeight
			}}
		>
			<div className="w-full h-full md:px-4 py-1 px-3 text-white flex justify-between items-center">
				<Link
					className="text-2xl md:text-3xl font-thin"
					to="/"
				>
					MILANO
				</Link>

				<FullWidthNav 
					onClickSearch={handleClickSearch}
					onClickExpand={(e) => {
						e.preventDefault();
						setExpanded(!expanded);
					}}
					onClickSignIn={handleClickSignIn}
					expanded={expanded}
				/>
			</div>

			<DropdownNav 
				onClickSignIn={handleClickSignIn}
				closeDropdownFn={() => setExpanded(false)}
				expanded={expanded}
			/>	
		</header>
	);
});

export default Header;