'use client';
import React from 'react';
import "./style.css";
import ModalClients from './ModalClients';
import { createHash } from 'crypto';

const FloatingButton = () => {
    const userPermissions = sessionStorage.getItem("Level");
    return (
        <>
            {userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
                <>
                    <label htmlFor="modalClientFloatingButton" className="floating-button">
                        +
                    </label>
                    <ModalClients modalId="modalClientFloatingButton" firstName={""} lastName={""} CI={""} CNP={""} companyId={""}
                        companyRole={""} address={""} email={""} phone={""} interests={""} secondButton={true} />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default FloatingButton;
