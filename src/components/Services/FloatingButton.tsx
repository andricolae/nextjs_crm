'use client';
import React from 'react';
import "./style.css";
import ModalServices from './ModalServices';
import { createHash } from 'crypto';

const FloatingButton = () => {
    const userPermissions = sessionStorage.getItem("Level");
    return (
        <>
            {userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
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
