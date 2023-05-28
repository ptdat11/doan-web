import React from "react";

interface Props {
    when: boolean | null | undefined,
    fallback?: JSX.Element,
    children: JSX.Element
};

const Show: React.FC<Props> = React.memo((props) => {
    return (
        <>
            {
                props.when ?
                props.children :
                props.fallback
            }
        </>
    );
});

export default Show;