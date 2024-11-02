'use client';
import React, { useState } from 'react';

const ModalServices = (props: any) => {
    const [name, setName] = useState<string | undefined>(props.name);
    const [description, setDescription] = useState<string | undefined>(props.description);
    const [price, setPrice] = useState<string | undefined>(props.price);
    
    const saveServiceChanges = async () => {
        let Id = props.Id;
        try {
            const response = await fetch(`/api/updateService/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: name,
                    Description: description,
                    Price: price,
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

    const addService = async () => {
        try {
            await fetch(`/api/insertService`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: name,
                    Description: description,
                    Price: price,
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
                    <div className="grid grid-cols-1 sm:grid-rows-3">
                        <label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
                        <input placeholder="Name" value={name} className="flex items-center gap-3 p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setName(e.target.value)} />
                        <input placeholder="Description" value={description} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setDescription(e.target.value)} />
                        <input placeholder="Price" value={price} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className="modal-action">
                        <label htmlFor={props.modalId} className="btn btn-info text-white" onClick={props.secondButton === false ? saveServiceChanges : addService}>Save</label>
                        <button className="btn btn-outline btn-error" onClick={deleteService} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalServices;
