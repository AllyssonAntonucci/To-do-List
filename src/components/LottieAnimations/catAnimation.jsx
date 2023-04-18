import React from "react";
import Lottie from "react-lottie"
import cat from "../../assets/lotties/cat.json"

export const CatAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cat,
    };

    return (
       
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} width="100%" height="100%" />
        
    );
};