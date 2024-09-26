'use client';
import React, { useState } from 'react';

const ModalClients = (props: any) => {
    const [firstName, setFirstName] = useState<string | undefined>(props.firstName);
    const [lastName, setLastName] = useState<string | undefined>(props.lastName);
    const [CI, setCI] = useState<string | undefined>(props.CI);
    const [CNP, setCNP] = useState<string | undefined>(props.CNP);
    const [companyId, setCompanyId] = useState<string | undefined>(props.companyId);
    const [companyRole, setCompanyRole] = useState<string | undefined>(props.companyRole);
    const [address, setAddress] = useState<string | undefined>(props.address);
    const [email, setEmail] = useState<string | undefined>(props.email);
    const [phone, setPhone] = useState<string | undefined>(props.phone);
    const [interests, setInterests] = useState<string | undefined>(props.interests);

    const saveClientChanges = async () => {
        try {
            await fetch(`http://localhost:3000/api/updateClients/${props.clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    CI: CI,
                    CNP: CNP,
                    CompanyId: companyId,
                    CompanyRole: companyRole,
                    Address: address,
                    Email: email,
                    Phone: phone,
                    Interests: interests,
                }),
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    const addClient = async () => {
        try {
            await fetch(`http://localhost:3000/api/insertClient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    CI: CI,
                    CNP: CNP,
                    CompanyId: companyId,
                    CompanyRole: companyRole,
                    Address: address,
                    Email: email,
                    Phone: phone,
                    Interests: interests,
                }),
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    const deleteClient = async () => {
        try {
            await fetch(`http://localhost:3000/api/deleteClient/${props.clientId}`, {
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
                        <input placeholder="First Name" value={firstName} className="flex items-center gap-3 p-2.5 xl:p-5 text-black" onChange={(e) => setFirstName(e.target.value)} />
                        <input placeholder="Last Name" value={lastName} className="flex items-center justify-center p-2.5 xl:p-5 text-black" onChange={(e) => setLastName(e.target.value)} />
                        <input placeholder="CI" value={CI} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3" onChange={(e) => setCI(e.target.value)} />
                        <input placeholder="CNP" value={CNP} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black" onChange={(e) => setCNP(e.target.value)} />
                        <input placeholder="Company ID" value={companyId} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setCompanyId(e.target.value)} />
                        <input placeholder="Company role" value={companyRole} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setCompanyRole(e.target.value)} />
                        <input placeholder="Address" value={address} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setAddress(e.target.value)} />
                        <input placeholder="Email" value={email} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setEmail(e.target.value)} />
                        <input placeholder="Phone" value={phone} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setPhone(e.target.value)} />
                        <input placeholder="Interests" value={interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5" onChange={(e) => setInterests(e.target.value)} />
                    </div>
                    <div className="modal-action">
                        <label htmlFor={props.modalId} className="btn btn-info" onClick={props.secondButton === false ? saveClientChanges : addClient}>Save</label>
                        <button className="btn btn-outline btn-error" onClick={deleteClient} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalClients;
