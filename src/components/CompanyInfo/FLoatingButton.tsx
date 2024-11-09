'use client';
import React from 'react';
import "./style.css";
import ModalCompany from './ModalCompany';
import { createHash } from 'crypto';

const FloatingButton = () => {
    const userPermissions = sessionStorage.getItem("Level");
    return (
        <>
            {userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
                <>
                    <label htmlFor="modalCompanyFloatingButton" className="floating-button">
                        +
                    </label>
                    <ModalCompany modalId="modalCompanyFloatingButton" companyName={""} TVA={""} shareholders={""}
                        CIF={""} COM={""} headquarter={""} subsidiary={""} mainActivity={""} secondaryActivity={""} interests={""} secondButton={true} />
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default FloatingButton;
