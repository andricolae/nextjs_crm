'use client';
import React, { useState } from 'react';

const ModalServices = (props: any) => {
    const [Name, setName] = useState<string | undefined>(props.Name);
    const [Description, setDescription] = useState<string | undefined>(props.lastName);
    const [Price, setPrice] = useState<string | undefined>(props.CI);
    
    const saveServiceChanges = async () => {
        try {
            await fetch(`/api/updateServices/${props.clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: Name,
                    Description: Description,
                    Price: Price,
                }),
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    const addService = async () => {
        try {
            await fetch(`/api/insertService`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: Name,
                    Description: Description,
                    Price: Price,
                }),
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }

    const deleteService = async () => {
        try {
            await fetch(`/api/deleteService/${props.Id}`, {
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
                        <input placeholder="Name" value={Name} className="flex items-center gap-3 p-2.5 xl:p-5 text-black" onChange={(e) => setName(e.target.value)} />
                        <input placeholder="Description" value={Description} className="flex items-center justify-center p-2.5 xl:p-5 text-black" onChange={(e) => setDescription(e.target.value)} />
                        <input placeholder="Price" value={Price} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3" onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className="modal-action">
                        <label htmlFor={props.modalId} className="btn btn-info" onClick={props.secondButton === false ? saveServiceChanges : addService}>Save</label>
                        <button className="btn btn-outline btn-error" onClick={deleteService} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalServices;
