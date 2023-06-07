import React, { useState } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import For from "../../flow-control/for/For";
import Hr from "../../hr/Hr";
import SearchBar from "../../search-bar/SearchBar";
import Show from "../../flow-control/if/Show";
import Button from "../../button/Button";
import useRefreshToken from "../../../hooks/useRefreshToken";
import DefaultAvatar from "../../avatar/DefaultAvatar";
import { useRecoilValue } from "recoil";
import useFetch from "../../../hooks/useFetch";
import { categoriesGET } from "../../../interfaces/api-formats/categories";
import { apiUrlSelector } from "../../../states/system-states";
import CartIcon from "../../icon/CartIcon";
import useProfile from "../../../hooks/useProfile";
import Cookies from "js-cookie";

interface Props extends BaseProps {
    onClickSignIn: React.MouseEventHandler<HTMLButtonElement>,
}

const FullWidthNav: React.FC<Props> = React.memo((props) => {
    const [searchKey, setSearchKey] = useState("");
    const location = useLocation();
    let accessToken = useRefreshToken();
    const navigate = useNavigate();
    const categoriesApiUrl = useRecoilValue(apiUrlSelector("categories"));
	const categories = useFetch<categoriesGET[]>({
		url: categoriesApiUrl,
		method: "GET"
	}, []);
    
    const profile = useProfile();

    const handleSignOut = () => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        window.location.reload();
    }
    
    const handleSearch = () => {
        navigate({
            pathname: "/search",
            search: `?key=${searchKey}`
        });
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
                            to={{
                                pathname: "/search",
                                search: `?category=${site.name}`
                            }}
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
                onClickSearch={handleSearch}
                onPressEnter={handleSearch}
            />

            <Show
                when={!!accessToken}
                fallback={
                    <Button
                        className="max-sm:hidden"
                        onClick={props.onClickSignIn}
                    >
                        Đăng nhập
                    </Button>
                }
            >
                <>
                <Link
                    to="/cart"
                >
                    <Button 
                        className="max-sm:hidden px-4 lg:px-2"
                    >
                       <CartIcon className="lg:mr-2" size={20} /> 
                       <span className="max-lg:hidden">Giỏ hàng</span>
                    </Button>
                </Link>
                <Dropdown
                    className="bg-black"
                    itemClassName="p-1 [&>*]:block"
                    label={
                        <DefaultAvatar
                            className="cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                            size={30} 
                        />
                    }
                    align="left"
                    top={15}
                >
                    <Link
                        className="py-2 font-light hover:text-[#747bff]"
                        to="/user"
                    >
                        <div className="font-bold">
                            {profile?.name}
                        </div>
                        <div>
                            @{profile?.user?.username}
                        </div>
                    </Link>
                    <Button 
                        className="mx-auto py-2"
                        onClick={handleSignOut}    
                    >
                        Đăng xuất
                    </Button>
                </Dropdown>
                </>
            </Show>
        </>
    );
});

export default FullWidthNav;