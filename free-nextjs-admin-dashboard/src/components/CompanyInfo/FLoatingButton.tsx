import React from 'react';
import "./style.css";
import ModalCompany from '../common/ModalCompany';


const FloatingButton = () => {
    return (
        <>
            <label htmlFor="modalCompanyFloatingButton" className="floating-button">
                +
            </label>
            <ModalCompany modalId="modalCompanyFloatingButton" companyName={""} TVA={""} shareholders={""}
                CIF={""} COM={""} headquarter={""} subsidiary={""} mainActivity={""} secondaryActivity={""} interests={""} secondButton={true} />
        </>
    );
};

export default FloatingButton;
