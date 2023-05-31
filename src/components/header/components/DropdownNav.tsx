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

interface Props extends BaseProps {
    onClickSignIn: React.MouseEventHandler<HTMLButtonElement>,
}

const DropdownNav: React.FC<Props> = React.memo((props) => {
	const location = useLocation();
    const accessToken = useRefreshToken();
    const containerRef = useRef<HTMLDivElement>(null);
    
    return (
        <div 
            ref={containerRef}
            className={combineClassnames(
                props.className,
                "sm:hidden w-screen text-white bg-black origin-top duration-100 [&>*]:px-4"
            )}
            style={{...props.style}}
        >
            <Show when={!accessToken}>
                <div className="bg-black p-1">
                    <Button
                        className="w-32 rounded-sm"
                        onClick={(e) => {
                            props.onClickSignIn(e);
                        }}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </Show>

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
                <For each={categorySites}>
                    {(site, index) => 
                    <div 
                        key={index}
                        className="w-full [&>*]:px-6"
                    >
                        {index > 0 ? <Hr /> : <></>}
                        <Link
                            className="w-screen block p-2"
                            to={site.path}
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