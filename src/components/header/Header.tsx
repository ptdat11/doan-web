import React, { useState } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { headerHeight } from "../../variables.css";
import { Link, useNavigate } from "react-router-dom";
import FullWidthNav from "./components/FullWidthNav";
import DropdownNav from "./components/DropdownNav";
import Dropdown from "../dropdown/Dropdown";

interface Props extends BaseProps {}

const Header: React.FC<Props> = React.memo((props) => {
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
				"w-screen fixed bg-black md:px-4 py-1 px-3 pr-0 text-white flex justify-between items-center"
			)}
			style={{
				...props.style,
				height: headerHeight
			}}
		>
			<Link
				className="text-2xl md:text-3xl font-normal hover:text-inherit"
				to="/"
			>
				MILANO
			</Link>

			<nav className="grow-0 flex w-8/12 sm:w-9/12 lg:w-7/12 h-3/5 sm:pr-3 justify-between items-center text-base md:text-lg text-white">
				<FullWidthNav 
					onClickSearch={handleClickSearch}
					onClickSignIn={handleClickSignIn}
				/>

				<Dropdown
					className="sm:hidden h-full flex justify-center relative pr-6 bg-black"
					showCaret
					align="left"
					top={headerHeight / 9}
				>
					<DropdownNav 
						// className="absolute left-0 "
						onClickSignIn={handleClickSignIn}
					/>
				</Dropdown>
			</nav>
		</header>
	);
});

export default Header;