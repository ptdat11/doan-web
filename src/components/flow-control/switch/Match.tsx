import React from "react";

interface Props {
    when: boolean | undefined | null,
    children: JSX.Element | string
}

const Match: React.FC<Props> = React.memo((props) => {
    return (
        <>
            {props.children}
        </>
    );
});

export default Match;