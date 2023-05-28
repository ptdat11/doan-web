import React from "react";

interface Props<T, U extends JSX.Element> {
    each: readonly T[] | undefined | null | false,
    fallback?: JSX.Element,
    children: (item: T, index: number) => U
};

const For = <T, U extends JSX.Element>(props: Props<T, U>) => {
    return (
        <>
            {
                props.each ?
                props.each.map((item, index) => props.children(item, index)) :
                props.fallback
            }
        </>
    );
};

export default For;