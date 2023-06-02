import React, { useEffect, useRef } from "react";
import { BaseProps } from "../../../submodules/base-props/base-props";
import combineClassnames from "../../../submodules/string-processing/combine-classname";
import { productCardWidth, productCardWidthSm } from "../../../variables.css";

interface Props extends BaseProps {}

const ProductLayout: React.FC<Props> = React.memo((props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current)
            return () => {};

        const container = containerRef.current;
        const observer = new ResizeObserver((entry) => {
            const maxWidth = entry[0].contentRect.width;
            const cardWidth = (window.innerWidth <= 640) ? productCardWidth : productCardWidthSm;
            let maxColTempl = Math.floor(maxWidth / cardWidth);

            container.style.gridTemplateColumns = `repeat(${maxColTempl}, minmax(0, 1fr))`
        });

        observer.observe(container);

        return () => observer.unobserve(container);
    });

    return (
        <div
            ref={containerRef}
            className={combineClassnames(
                props.className,
                "w-full grid justify-items-center"
            )}
            style={{...props.style}}
        >
            {props.children}
        </div>
    );
});

export default ProductLayout;