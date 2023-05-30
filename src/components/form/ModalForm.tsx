import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import For from "../flow-control/for/For";
import LabeledInput, { LabeledInputProps } from "../input/LabeledInput";
import Button from "../button/Button";
import Modal from "../modal/Modal";

interface Props extends BaseProps {
    isShowing?: boolean,
    title?: string,
    textFields: LabeledInputProps[],
    button?: {
        label?: string,
        onClick?: React.MouseEventHandler<HTMLButtonElement>,
    },
    smallBottomInfo?: JSX.Element
};

const ModalForm: React.FC<Props> = React.memo((props) => {
    return (
        <Modal
            isShowing={props.isShowing}      
        >
            <form className="px-12 py-4 text-base flex flex-col items-center rounded-lg bg-white">
                <h2 className="m-2 text-2xl text-center font-semibold">
                    {props.title}
                </h2>

                <For each={props.textFields}>
                    {(field, index) => {
                        return <LabeledInput
                            key={index}
                            className="block my-2" 
                            inputClassName="w-72"
                            {...field}
                        />
                    }}
                </For>

                <Button
                    className="py-1 px-8 rounded-xl my-5 font-light text-lg"
                    onClick={props.button?.onClick}
                >
                    {props.button?.label}
                </Button>

                <p>{props.smallBottomInfo}</p>
            </form>
        </Modal>
    );
});

export default ModalForm;