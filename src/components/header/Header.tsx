import React, { useState } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { headerHeight } from "../../variables.css";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pageState } from "../../states/system-states";
import SearchBar from "../search-bar/SearchBar";
import { userState } from "../../states/user-states";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import Hr from "../hr/Hr";
import { categorySites } from "../../category-site";

interface Props extends BaseProps {}

const Header: React.FC<Props> = React.memo((props) => {
	const [page, setPage] = useRecoilState(pageState);
	const [expanded, setExpanded] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const [userInfo, setUserInfo] = useRecoilState(userState)

	const handleClickSearch = () => {

	};

	const handleClickSignIn = () => {

	};

	return (
		<header
			className={combineClassnames(
					props.className,
					"w-full fixed bg-black items-center"
			)}
			style={{
				...props.style,
				height: headerHeight
			}}
		>
			<div className="w-full h-full md:px-4 py-1 px-3 flex justify-between items-center">
				<Link
					className="text-2xl md:text-3xl font-thin"
					to="/"
				>
					MILANO
				</Link>

				<nav
					className="w-8/12 justify-end sm:w-9/12 lg:w-7/12 h-3/5 flex sm:justify-between items-center text-base md:text-lg text-white"
				>
						<Link
							className={combineClassnames(
								page === "home" ? "text-yellow-300" : "",
								"max-sm:hidden font-thin"
							)}
							onClick={() => setPage("home")}
							to="/"
						>
							Trang chủ
						</Link>
						<Dropdown
							className="max-sm:hidden font-thin bg-black"
							label={
								<span
									className={combineClassnames(
										page === "product" ? "text-yellow-300" : "",
									)}
								>
									Sản phẩm
								</span>
							}
							width="w-max"
						>
							{categorySites.map((site, index) => 
								<div key={index}>
									{index > 0 ? <Hr /> : <></>}
									<Link
										to={site.url}
										className="block px-1 py-2 font-thin"
									>
										{site.name}
									</Link>
								</div>
							)}
						</Dropdown>
						<Link
							className={combineClassnames(
								page === "about" ? "text-yellow-300" : "",
								"max-sm:hidden font-thin"
							)}
							onClick={() => setPage("about")}
							to="/about"
						>
							Giới thiệu
						</Link>

						<SearchBar 
							className="w-7/12 sm:w-3/12"
							style={{height: headerHeight / 3}}
							value={searchKey}
							onChange={(e) => setSearchKey(e.target.value)}
							onClickSearch={handleClickSearch}
						/>

						{
							userInfo ?
							<img src="" /> :
							<Button
								className="max-sm:hidden"
								onClick={handleClickSignIn}
							>
								Đăng nhập
							</Button>
						}
						<button
							className="sm:hidden ml-3 p-[0.06rem] bg-white"
							onClick={() => setExpanded(!expanded)}
						>
							<svg 
								className={combineClassnames(
									"duration-200",
									expanded ? "rotate-180" : ""
								)} width="24" height="24" viewBox="0 0 24 24"
							>
									<path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z" />
							</svg>
						</button>
				</nav>
			</div>

			<div className={combineClassnames(
				expanded ? "" : "scale-y-0 h-0",
				"sm:hidden w-full bg-black origin-top duration-100 [&>*]:px-4"
			)}>
				<hr />
				<div className="bg-black p-1">
					<Button
						className="w-32 rounded-sm"
						onClick={handleClickSignIn}
					>
						Đăng nhập
					</Button>
				</div>

				<Hr />
				<Link
					className={combineClassnames(
						page === "home" ? "text-yellow-400" : "",
						"block p-2 font-thin bg-black"
					)}
					to="/"
				>
					Trang chủ
				</Link>

				<Hr />
				<Dropdown
					className="font-thin p-2 flex justify-between bg-black"
					label={
						<div
							className={combineClassnames(
								page === "product" ? "text-yellow-300" : "",
							)}
						>
							Sản phẩm
						</div>
					}
					width="w-full"
				>
					{categorySites.map((site, index) => 
						<div 
							key={index}
							className="w-full"
						>
							{index > 0 ? <Hr /> : <></>}
							<Link
								className="block p-2"
								to={site.url}
							>
								{site.name}
							</Link>
						</div>
					)}
				</Dropdown>

				<Hr />
				<Link
					className={combineClassnames(
						page === "about" ? "text-yellow-400" : "",
						"block p-2 font-thin bg-black"
					)}
					to="/about"
				>
					Giới thiệu
				</Link>
			</div>
		</header>
	);
});

export default Header;