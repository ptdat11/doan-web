import React from 'react';
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from '../../submodules/string-processing/combine-classname';

interface Props extends BaseProps {
    value?: string | number,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onClickSearch?: React.MouseEventHandler<HTMLButtonElement>,
	onPressEnter?: () => void
}

const SearchBar: React.FC<Props> = React.memo((props) =>{
	return (
		<div
			className={combineClassnames(
				props.className,
				"flex bg-white rounded-lg"
			)}
			style={{...props.style}}
		>
			<button 
				className="border-0 p-0 duration-75 bg-white active:bg-gray-400"
				onClick={props.onClickSearch}
			>
				<svg className="mx-[0.2rem] stroke-black" width={25} height={25} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
					<path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6" fill="none"></circle>
				</svg>
			</button>
			<input 
				value={props.value}
				className="bg-white outline-none text-black grow rounded-r-lg min-w-0"
				onChange={props.onChange}
				onKeyDown={(e) => {
					if (e.key === "Enter" && props.onPressEnter)
						props.onPressEnter();
				}}
			/>
		</div>
	);
});

export default SearchBar;