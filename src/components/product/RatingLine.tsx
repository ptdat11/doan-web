import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import For from "../flow-control/for/For";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    score: number,
    starSize: number
};
const RatingLine: React.FC<Props> = React.memo((props) => {
    return (
        <div
            className={combineClassnames(
                props.className,
                "flex justify-between"
            )}
            style={{...props.style}}
        >
            <For each={[1, 2, 3, 4, 5]}>
                {(score, index) => 
                score <= props.score ?
                <Star key={index} size={props.starSize} hexColor="#ffce31" /> :
                <Star key={index} size={props.starSize} hexColor="#888888" />
                }
            </For>
        </div>
    );
});

interface StarProps extends BaseProps {
    size: number,
    hexColor: string
}
const Star: React.FC<StarProps> = React.memo((props) => {
    return (
        <svg className="inline" width={props.size} height={props.size} viewBox="0 0 64 64" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
            <path d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" fill={props.hexColor}/>
        </svg>
    );
});

export default RatingLine;