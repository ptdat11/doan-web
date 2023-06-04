import React, { useEffect, useRef } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import Button from "../../button/Button";
import Hr from "../../hr/Hr";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";
import { categorySites } from "../../../category-site";
import For from "../../flow-control/for/For";
import useRefreshToken from "../../../hooks/useRefreshToken";
import Show from "../../flow-control/if/Show";
import { useRecoilValue } from "recoil";
import { apiUrlSelector } from "../../../states/system-states";
import { categoriesGET } from "../../../interfaces/api-formats/categories";
import useFetch from "../../../hooks/useFetch";
import Switch from "../../flow-control/switch/Switch";
import Match from "../../flow-control/switch/Match";
import CartIcon from "../../icon/CartIcon";

interface Props extends BaseProps {
    onClickSignIn: React.MouseEventHandler<HTMLButtonElement>,
}

const DropdownNav: React.FC<Props> = React.memo((props) => {
	const location = useLocation();
    const accessToken = useRefreshToken();
    const containerRef = useRef<HTMLDivElement>(null);
    const categoriesApiUrl = useRecoilValue(apiUrlSelector("categories"));
	const categories = useFetch<categoriesGET[]>({
		url: categoriesApiUrl,
		method: "GET"
	}, []);

    return (
        <div 
            ref={containerRef}
            className={combineClassnames(
                props.className,
                "sm:hidden w-screen text-white bg-black origin-top duration-100 [&>*]:px-4"
            )}
            style={{...props.style}}
        >
            <div className="bg-black p-1">
                <Switch>
                <Match when={!!accessToken}>
                    <Link to="/cart">
                        <Button className="px-4">
                            <CartIcon size={20} /> Giỏ hàng
                        </Button>
                    </Link>
                </Match>

                <Match when={!accessToken}>
                    <Button
                        className="w-32 rounded-sm"
                        onClick={(e) => {
                            props.onClickSignIn(e);
                        }}
                    >
                        Đăng nhập
                    </Button>
                </Match>
                </Switch>
            </div>

            <Hr />
            <Link
                className={combineClassnames(
                    location.pathname === "/" ? "text-yellow-400" : "",
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
                            location.pathname === "/product" ? "text-yellow-300" : "",
                        )}
                    >
                        Sản phẩm
                    </div>
                }
                align="right"
            >
                <Hr />
                <For each={categories.data}>
                    {(site, index) => 
                    <div 
                        key={index}
                        className="w-full [&>*]:px-6"
                    >
                        {index > 0 ? <Hr /> : <></>}
                        <Link
                            className="w-screen block p-2"
                            to={{
                                pathname: "/search",
                                search: `?category=${site.name}`
                            }}
                        >
                            {site.name}
                        </Link>
                    </div>
                    }
                </For>
            </Dropdown>

            <Hr />
            <Link
                className={combineClassnames(
                    location.pathname === "/about" ? "text-yellow-400" : "",
                    "block p-2 font-thin bg-black"
                )}
                to="/about"
            >
                Giới thiệu
            </Link>
        </div>
    );
});

export default DropdownNav;