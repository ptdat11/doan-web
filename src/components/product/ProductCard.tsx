import React, { useEffect, useRef } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import { productCardWidth, productCardWidthSm } from "../../variables.css";
import RatingLine from "./RatingLine";
import { Link } from "react-router-dom";
import { imgUrl } from "../../states/system-states";

interface Props extends BaseProps {
    id: number,
    name: string,
    rating: number,
    price: number,
    imgId: string
};

const ProductCard: React.FC<Props> = React.memo((props) => {
    const cardRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current)
            return;

        const card = cardRef.current;
        const observer = new ResizeObserver((entry) => {
            if (entry[0].contentRect.width <= 640) {
                card.style.width = productCardWidth + "px";
                card.style.height = productCardWidth * 1.5 + "px";
            }
            else {
                card.style.width = productCardWidthSm + "px";
                card.style.height = productCardWidthSm * 1.3 + "px";
            }
        });

        observer.observe(document.body);


        return observer.unobserve(document.documentElement);
    }, [window.innerWidth]);


    return (
        <Link
            to={`/product/${props.id}`}
        >
            <figure
                ref={cardRef}
                className={combineClassnames(
                    props.className,
                    "p-4 flex flex-col duration-200 hover:scale-105 cursor-pointer"
                )}
                style={{
                    ...props.style,
                }}
            >
                <div
                    ref={imgRef}
                    className="overflow-hidden h-[40%] sm:h-[60%]"
                >
                    <img 
                        className="w-full"
                        src={imgUrl(props.imgId)}
                        alt={props.name}
                    />
                </div>
                <figcaption className="grow">
                    <p className="font-bold sm:text-xl hover:text-[#646cff]">{props.name}</p>
                    <RatingLine 
                        className="w-1/2 mb-2"
                        score={props.rating} 
                        starSize={cardRef.current ? cardRef.current.offsetWidth / 16 : 20}
                    />
                    <p className="text-sm sm:text-xl font-semibold text-[#e42f2f]">
                        {props.price.toLocaleString()} VNĐ
                    </p>
                </figcaption>
            </figure>
        </Link>
    );
});

export default ProductCard;