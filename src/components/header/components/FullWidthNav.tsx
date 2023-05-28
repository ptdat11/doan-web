import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import For from "../../flow-control/for/For";
import Hr from "../../hr/Hr";
import { categorySites } from "../../../category-site";
import SearchBar from "../../search-bar/SearchBar";
import Show from "../../flow-control/if/Show";
import Button from "../../button/Button";
import { useRecoilState } from "recoil";
import { userState } from "../../../states/user-states";

interface Props extends BaseProps {
    onClickSearch: React.MouseEventHandler<HTMLButtonElement>,
    onClickSignIn: React.MouseEventHandler<HTMLButtonElement>,
    onClickExpand: React.MouseEventHandler<HTMLButtonElement>
    expanded: boolean
}

const FullWidthNav: React.FC<Props> = React.memo((props) => {
    const [searchKey, setSearchKey] = useState("");
	const [userInfo, setUserInfo] = useRecoilState(userState);
    const location = useLocation();

    return (
        <nav
            className="w-8/12 justify-end sm:w-9/12 lg:w-7/12 h-3/5 flex sm:justify-between items-center text-base md:text-lg text-white"
        >
            <Link
                className={combineClassnames(
                    location.pathname === "/" ? "text-yellow-300" : "",
                    "max-sm:hidden font-light"
                )}
                to="/"
            >
                Trang chủ
            </Link>
            <Dropdown
                className="max-sm:hidden font-light bg-black"
                label={
                    <span
                        className={combineClassnames(
                            location.pathname === "/product" ? "text-yellow-300" : "",
                        )}
                    >
                        Sản phẩm
                    </span>
                }
                width="w-max"
            >
                <For each={categorySites}>
                    {(site, index) => 
                    <div key={index}>
                        {index > 0 ? <Hr /> : <></>}
                        <Link
                            to={site.path}
                            className="block px-1 py-2 font-light"
                        >
                            {site.name}
                        </Link>
                    </div>
                    }
                </For>
            </Dropdown>
            <Link
                className={combineClassnames(
                    location.pathname === "/about" ? "text-yellow-300" : "",
                    "max-sm:hidden font-light"
                )}
                to="/about"
            >
                Giới thiệu
            </Link>

            <SearchBar
                className="w-7/12 sm:w-3/12 h-2/3"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onClickSearch={props.onClickSearch}
            />

            <Show
                when={!userInfo}
                fallback={<img />}
            >
                <Button
                    className="max-sm:hidden"
                    onClick={props.onClickSignIn}
                >
                    Đăng nhập
                </Button>
            </Show>
            
            <button
                className="sm:hidden ml-3 p-[0.07rem] bg-white"
                onClick={props.onClickExpand}
            >
                <svg 
                    className={combineClassnames(
                        "duration-200",
                        props.expanded ? "rotate-180" : ""
                    )} width="24" height="24" viewBox="0 0 24 24"
                >
                        <path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z" />
                </svg>
            </button>
    </nav>
    );
});

export default FullWidthNav;