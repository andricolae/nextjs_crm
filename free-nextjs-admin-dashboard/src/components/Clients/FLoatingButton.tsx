import React from 'react';
import "./style.css";
import ModalClients from '../common/ModalClients';

const FloatingButton = () => {
    return (
        <>
            <label htmlFor="modalClientFloatingButton" className="floating-button">
                +
            </label>
            <ModalClients modalId="modalClientFloatingButton" firstName={"sfvgrf"} lastName={"sfvgrf"} CI={"sfvgrf"} CNP={"sfvgrf"} companyId={"sfvgrf"}
                companyRole={"sfvgrf"} address={"sfvgrf"} email={"sfvgrf"} phone={"sfvgrf"} interests={"sfvgrf"} />
        </>
    );
};

export default FloatingButton;
