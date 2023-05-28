import React from "react";

interface Props {
    fallback: JSX.Element,
    children: JSX.Element
};

const ErrorBoundary: React.FC<Props> = React.memo((props) => {
    let result: JSX.Element = <></>;
    try {
        result = React.createElement(props.children.type, props.children.props);
    }
    catch {
        result = props.fallback
    }

    return (
        <>
            {result}
        </>
    )
});

export default ErrorBoundary;