import React from "react"
import Match from "./Match";

interface Props {
    fallback?: JSX.Element,
    children: JSX.Element[]
};

const Switch: React.FC<Props> = React.memo((props) => {
    const first = props.children.findIndex(child => child.type === Match &&
            child.props.when
        );
    return (
        <>
            {
                first === -1 ?
                <></> :
                props.children[first]
            }
        </>
    )
});

export default Switch;