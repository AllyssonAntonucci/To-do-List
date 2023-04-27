import React from "react";
import Lottie from "react-lottie"
import notebook from "../../assets/lotties/notebook.json"
import { useMediaQuery } from 'react-responsive';

export const NotebookAnimation = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const lottieWidth = isDesktop ? '30%' : '75%';
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notebook,
    };

    return (
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} width={lottieWidth} height="100%"/>
    );
};