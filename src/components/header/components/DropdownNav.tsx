import React from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import Button from "../../button/Button";
import Hr from "../../hr/Hr";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";
import { categorySites } from "../../../category-site";
import For from "../../flow-control/for/For";

interface Props extends BaseProps {
    onClickSignIn: React.MouseEventHandler<HTMLButtonElement>,
    closeDropdownFn: () => void,
    expanded: boolean
}

const DropdownNav: React.FC<Props> = React.memo((props) => {
	const location = useLocation();
    
    return (
        <div className={combineClassnames(
            props.expanded ? "" : "scale-y-0 h-0",
            "sm:hidden w-full text-white bg-black origin-top duration-100 [&>*]:px-4"
        )}>
            <hr />
            <div className="bg-black p-1">
                <Button
                    className="w-32 rounded-sm"
                    onClick={(e) => {
                        props.onClickSignIn(e);
                        props.closeDropdownFn();
                    }}
                >
                    Đăng nhập
                </Button>
            </div>

            <Hr />
            <Link
                className={combineClassnames(
                    location.pathname === "/" ? "text-yellow-400" : "",
                    "block p-2 font-thin bg-black"
                )}
                onClick={props.closeDropdownFn}
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
                width="w-full"
            >
                <For each={categorySites}>
                    {(site, index) => 
                    <div 
                        key={index}
                        className="w-full [&>*]:px-6"
                    >
                        {index > 0 ? <Hr /> : <></>}
                        <Link
                            className="block p-2"
                            to={site.path}
                            onClick={props.closeDropdownFn}
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
                onClick={props.closeDropdownFn}
                to="/about"
            >
                Giới thiệu
            </Link>
        </div>
    );
});

export default DropdownNav;