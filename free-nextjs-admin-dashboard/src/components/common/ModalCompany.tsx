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

    const save = async () => {

    }

    const deleteCompany = async () => {

    }

    return (
        <>
            <input type="checkbox" id={props.id} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-full max-w-7xl">
                    <div className="grid grid-cols-3 sm:grid-cols-10">
                        <input placeholder="Company name" value={companyName !== null ? companyName : undefined} className="flex items-center gap-3 p-2.5 xl:p-5 text-black" onChange={(e) => setCompanyName(e.target.value)} />
                        <input placeholder="TVA" value={TVA !== null ? TVA : undefined} className="flex items-center justify-center p-2.5 xl:p-5 text-black" onChange={(e) => setTVA(e.target.value)} />
                        <input placeholder="Shareholders" value={shareholders !== null ? shareholders : undefined} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3" onChange={(e) => setShareholders(e.target.value)} />
                        <input placeholder="CIF" value={CIF !== null ? CIF : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black" onChange={(e) => setCIF(e.target.value)} />
                        <input placeholder="COM" value={COM !== null ? COM : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setCOM(e.target.value)} />
                        <input placeholder="Headquarter" value={headquarter !== null ? headquarter : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setHeadquarter(e.target.value)} />
                        <input placeholder="Subsidiary" value={subsidiary !== null ? subsidiary : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setSubsidiary(e.target.value)} />
                        <input placeholder="Main activity" value={mainActivity !== null ? mainActivity : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setMainActivity(e.target.value)} />
                        <input placeholder="Second activity" value={secondaryActivity !== null ? secondaryActivity : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setSecondaryActivity(e.target.value)} />
                        <input placeholder="Interests" value={interests !== null ? interests : undefined} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setInterests(e.target.value)} />
                    </div>
                    <div className="modal-action">
                        <label htmlFor={props.id} className="btn btn-info" onClick={save}>Save</label>
                        <label htmlFor={props.id} className="btn btn-outline btn-error" onClick={deleteCompany}>Delete</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCompany;
