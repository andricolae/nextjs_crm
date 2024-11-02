'use client';
import React from 'react';
import "./style.css";
import ModalClients from './ModalClients';

const FloatingButton = () => {
    const userPermissions = sessionStorage.getItem("Level");
    return (
        <>
            {userPermissions === "admin" ? (
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
