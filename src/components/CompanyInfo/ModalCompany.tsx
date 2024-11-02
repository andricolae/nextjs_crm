'use client';
import React, { useState } from 'react';

const ModalCompany = (props: any) => {
    const [companyName, setCompanyName] = useState(props.companyName);
    const [TVA, setTVA] = useState(props.TVA);
    const [shareholders, setShareholders] = useState(props.shareholders);
    const [CIF, setCIF] = useState(props.CIF);
    const [COM, setCOM] = useState(props.COM);
    const [headquarter, setHeadquarter] = useState(props.headquarter);
    const [subsidiary, setSubsidiary] = useState(props.subsidiary);
    const [mainActivity, setMainActivity] = useState(props.mainActivity);
    const [secondaryActivity, setSecondaryActivity] = useState(props.secondaryActivity);
    const [interests, setInterests] = useState(props.interests);

    const saveCompanyChanges = async () => {
        try {
            let CompanyId = props.companyId;
            const response = await fetch(`/api/updateCompanyInfo/${CompanyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    CompanyName: companyName,
                    TVA: TVA,
                    Shareholders: shareholders,
                    CIF: CIF,
                    COM: COM,
                    Headquarter: headquarter,
                    Subsidiary: subsidiary,
                    MainActivity: mainActivity,
                    SecondaryActivity: secondaryActivity,
                    Interests: interests,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    const addCompany = async () => {
        try {
            await fetch(`/api/insertCompanyInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    CompanyName: companyName,
                    TVA: TVA,
                    Shareholders: shareholders,
                    CIF: CIF,
                    COM: COM,
                    Headquarter: headquarter,
                    Subsidiary: subsidiary,
                    MainActivity: mainActivity,
                    SecondaryActivity: secondaryActivity,
                    Interests: interests,
                }),
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    const deleteCompany = async () => {
        try {
            await fetch(`/api/deleteCompanyInfo/${props.companyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    return (
        <>
            <input type="checkbox" id={props.modalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-[70%] max-w-3xl">
                    <div className="grid grid-cols-1 sm:grid-rows-10">
                        <label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
                        <input placeholder="Company name" value={companyName} className="flex items-center gap-3 p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCompanyName(e.target.value)} />
                        <input placeholder="TVA" value={TVA} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setTVA(e.target.value)} />
                        <input placeholder="Shareholders" value={shareholders} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setShareholders(e.target.value)} />
                        <input placeholder="CIF" value={CIF} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCIF(e.target.value)} />
                        <input placeholder="COM" value={COM} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCOM(e.target.value)} />
                        <input placeholder="Headquarter" value={headquarter} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setHeadquarter(e.target.value)} />
                        <input placeholder="Subsidiary" value={subsidiary} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setSubsidiary(e.target.value)} />
                        <input placeholder="Main activity" value={mainActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setMainActivity(e.target.value)} />
                        <input placeholder="Second activity" value={secondaryActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setSecondaryActivity(e.target.value)} />
                        <input placeholder="Interests" value={interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setInterests(e.target.value)} />
                    </div>
                    <div className="modal-action">
                        <label htmlFor={props.modalId} className="btn btn-info text-white" onClick={props.secondButton === false ? saveCompanyChanges : addCompany}>Save</label>
                        <button className="btn btn-outline btn-error" onClick={deleteCompany} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCompany;
