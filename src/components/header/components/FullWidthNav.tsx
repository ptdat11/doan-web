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
import useRefreshToken from "../../../hooks/useRefreshToken";
import DefaultAvatar from "../../avatar/DefaultAvatar";
import LocalStorage from "../../../submodules/local-storage/local-storage";
import { useRecoilValue } from "recoil";
import useFetch from "../../../hooks/useFetch";
import { categoriesGET } from "../../../interfaces/api-formats/categories";
import { apiUrlSelector } from "../../../states/system-states";

interface Props extends BaseProps {
    onClickSearch: () => void,
    onClickSignIn: React.MouseEventHandler<HTMLButtonElement>,
}

const FullWidthNav: React.FC<Props> = React.memo((props) => {
    const [searchKey, setSearchKey] = useState("");
    const location = useLocation();
    let accessToken = useRefreshToken();
    const categoriesApiUrl = useRecoilValue(apiUrlSelector("categories"));
	const categories = useFetch<categoriesGET[]>({
		url: categoriesApiUrl,
		method: "GET"
	});

    const handleSignOut = () => {
        LocalStorage.remove("jwt");
        window.location.reload();
    }

    return (
        <>
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
                showCaret
                align="center"
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
                <For each={categories.data}>
                    {(site, index) => 
                    <div key={index}>
                        {index > 0 ? <Hr /> : <></>}
                        <Link
                            to=""
                            // to={site.path}
                            className="block px-1 py-2 font-light"
                        >
                            asd
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
                onPressEnter={() => {
                    props.onClickSearch();
                }}
            />

            <Show
                when={!accessToken}
                fallback={
                    <Dropdown
                        className="bg-black"
                        label={
                            <DefaultAvatar
                                className="cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                                size={30} 
                            />
                        }
                        align="left"
                    >
                        <div className="[&>*]:block p-1">
                            <Link
                                className="py-2 font-light"
                                to="/user"
                            >
                                Trang cá nhân
                            </Link>
                            <Button 
                                className="ml-auto py-2"
                                onClick={handleSignOut}    
                            >
                                Đăng xuất
                            </Button>
                        </div>
                    </Dropdown>
                }
            >
                <Button
                    className="max-sm:hidden"
                    onClick={props.onClickSignIn}
                >
                    Đăng nhập
                </Button>
            </Show>
        </>
    );
});

export default FullWidthNav;