import React from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import { AnimatePresence, motion } from "framer-motion";
import combineClassnames from "../../submodules/string-processing/combine-classname";

interface Props extends BaseProps {
    isShowing?: boolean,
    onRemove?: () => void,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Modal: React.FC<Props> = React.memo((props) => {
    return (
        <AnimatePresence>
        {
            props.isShowing ?
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}

                onClick={props.onClick}
                className={combineClassnames(
                    props.className,
                    "fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center"
                )}
                style={{ 
                    ...props.style, 
                    backdropFilter: "blur(2px)", 
                    backgroundColor: "rgba(0, 0, 0, 0.7)" 
                }}
            >
                <div 
                    onClick={(e) => e.stopPropagation()}
                >
                    {props.children}
                </div>
            </motion.div> :
            <></>
        }
        </AnimatePresence>
    );
});

export default Modal;