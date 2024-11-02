'use client';
import React from 'react';
import "./style.css";
import ModalServices from './ModalServices';

const FloatingButton = () => {
    const userPermissions = sessionStorage.getItem("Level");
    return (
        <>
            {userPermissions === "admin" ? (
                <>
                    <label htmlFor="modalServiceFloatingButton" className="floating-button">
                        +
                    </label>
                    <ModalServices modalId="modalServiceFloatingButton" Name={""} Description={""} Price={""} secondButton={true} />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default FloatingButton;
