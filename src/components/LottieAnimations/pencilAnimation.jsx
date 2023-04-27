import React from "react";
import Lottie from "react-lottie"
import pencil from "../../assets/lotties/pencil.json"
import { useMediaQuery } from 'react-responsive';

export const PencilAnimation = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const lottieWidth = isDesktop ? '30%' : '75%';
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: pencil,
    };

    return (
       
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} width={lottieWidth} height="100%" />
        
    );
};