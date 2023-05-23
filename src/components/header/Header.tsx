import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { headerHeight } from "../../variables.css";
import { Link } from "react-router-dom";

interface Props extends BaseProps {}

const Header: React.FC<Props> = React.memo((props) => {
    return (
        <header
            className={combineClassnames(
                props.className,
                "w-full fixed px-4 py-1 bg-black flex justify-between items-center"
            )}
            style={{
                ...props.style,
                height: headerHeight
            }}
        >
            <Link
                className="text-2xl md:text-3xl font-thin"
                to="/"
            >
                MILANO
            </Link>

            <div
                className="w-8/12 flex justify-between text-base md:text-lg text-white"
            >
                <Link
                    className="font-thin"
                    to="/"
                >
                    Trang chủ
                </Link>
                <select>
                    <option></option>
                </select>
                <Link
                    className="font-thin"
                    to="/about"
                >
                    Giới thiệu
                </Link>
            </div>
        </header>
    );
});

export default Header;