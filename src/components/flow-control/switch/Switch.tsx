import React from "react"
import Match from "./Match";

interface Props {
    fallback?: JSX.Element,
    children: JSX.Element[]
};

const Switch: React.FC<Props> = React.memo((props) => {
    return (
        <>
            {props.children.
                filter(child => 
                    child.type === Match && 
                    child.props.when
            )}
        </>
    )
});

export default Switch;