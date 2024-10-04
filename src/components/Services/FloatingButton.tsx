import React from 'react';
import "./style.css";
import ModalServices from '../common/ModalServices';

const FloatingButton = () => {
    return (
        <>
            <label htmlFor="modalServiceFloatingButton" className="floating-button">
                +
            </label>
            <ModalServices modalId="modalServiceFloatingButton" Name={""} Description={""} Price={""} secondButton={true} />
        </>
    );
};

export default FloatingButton;
