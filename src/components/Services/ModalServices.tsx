'use client';
import React, { useState } from 'react';
import InfoPopup from '../common/InfoPopup';

export const addService = async (name: string | undefined, description: string | undefined, price: string | undefined, modalId?: string) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
	try {
		const response = await fetch(`/api/insertService`, {
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
		if (!response.ok) {
			if (modalInput?.checked) {
				InfoPopup("Changes not saved");
			}
			const error = await response.json();
			throw new Error(`Error: ${error.message}`);
		} else {
			addSuccessfuly = "1";
			if (modalInput?.checked) {
				modalInput.checked = false;
				InfoPopup("Changes saved");
			}
			window.location.reload();
		}
	} catch (error) {
		console.error(error);
	}
	return addSuccessfuly;
}

const ModalServices = (props: any) => {
	const [name, setName] = useState<string | undefined>(props.name);
	const [description, setDescription] = useState<string | undefined>(props.description);
	const [price, setPrice] = useState<string | undefined>(props.price);

	const saveServiceChanges = async () => {
		if (name === "" || description === "" || price === "") {
			InfoPopup("Type name, description and price");
			return;
		}
		const modalInput = document.getElementById(props.modalId) as HTMLInputElement;
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
				InfoPopup("Changes not saved");
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				window.location.reload();
				InfoPopup("Changes saved");
			}
		} catch (error) {
			InfoPopup("Something went wrong. Try again");
			console.error(error);
		}
	}

	const deleteService = async () => {
		const modalInput = document.getElementById(props.modalId) as HTMLInputElement;
		try {
			const response = await fetch(`/api/deleteService/${props.Id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				}
			});

			if (!response.ok) {
				InfoPopup("Service not deleted. Try again");
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				window.location.reload();
				InfoPopup("Changes saved");
			}
		} catch (error) {
			InfoPopup("Something went wrong. Try again");
			console.error(error);
		}
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
						<button className="btn btn-info text-white" onClick={props.secondButton === false ? saveServiceChanges : () => addService(name, description, price, props.modalId)}>Save</button>
						<button className="btn btn-outline btn-error" onClick={deleteService} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalServices;
function GenerateTSVFile(data: (string | string[] | { name: string; age: number; city: string; })[]) {
	throw new Error('Function not implemented.');
}

