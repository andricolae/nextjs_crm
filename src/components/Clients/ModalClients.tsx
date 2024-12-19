"use client";
import React, { useRef, useState } from "react";
import InfoPopup from "@/components/common/InfoPopup";

export const addClient = async (
	firstName: string | undefined,
	lastName: string | undefined,
	CI: string | undefined,
	CNP: string | undefined,
	companyId: string | undefined,
	companyRole: string | undefined,
	address: string | undefined,
	email: string | undefined,
	phone: string | undefined,
	interests: string | undefined,
	birthDate: string | undefined,
	details: string | undefined,
	modalId?: string
) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
	if (firstName === "" || firstName === undefined ||
		lastName === "" || lastName === undefined ||
		CI === "" || CI === undefined ||
		CNP === "" || CNP === undefined ||
		companyId === "" || companyId === undefined ||
		companyRole === "" || companyRole === undefined ||
		address === "" || address === undefined ||
		email === "" || email === undefined ||
		phone === "" || phone === undefined ||
		interests === "" || interests === undefined ||
		birthDate === "" || birthDate === undefined ||
		details === "" || details === undefined
	) {
		if (modalInput?.checked) {
			InfoPopup("Missing some required fields");
		}
		return addSuccessfuly;
	}
	try {
		const response = await fetch(`/api/insertClient`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
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
				BirthDate: birthDate,
				Details: details,
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
};

const ModalClients = (props: any) => {
	const [firstName, setFirstName] = useState<string | undefined>(props.client?.FirstName);
	const [lastName, setLastName] = useState<string | undefined>(props.client?.LastName);
	const [CI, setCI] = useState<string | undefined>(props.client?.CI);
	const [CNP, setCNP] = useState<string | undefined>(props.client?.CNP);
	const [companyId, setCompanyId] = useState<string | undefined>(props.client?.CompanyId);
	const [companyRole, setCompanyRole] = useState<string | undefined>(props.client?.CompanyRole);
	const [address, setAddress] = useState<string | undefined>(props.client?.Address);
	const [email, setEmail] = useState<string | undefined>(props.client?.Email);
	const [phone, setPhone] = useState<string | undefined>(props.client?.Phone);
	const [interests, setInterests] = useState<string | undefined>(props.client?.Interests);
	const [birthDate, setBirthDate] = useState<string | undefined>(props.client?.BirthDate);
	const [details, setDetails] = useState<string | undefined>(props.client?.Details);
	const statusEmail = useState(props.client?.StatusEmail);
	const statusSMS = useState(props.client?.StatusSMS);

	const [companiesArray, setCompaniesArray] = useState<{ CompanyId: string, CompanyName: string }[]>(
		() => {
			const storedData = sessionStorage.getItem("companiesArray");
			return storedData ? JSON.parse(storedData) : [];
		}
	);

	const detailsRef = useRef<HTMLDetailsElement>(null);
	const [companyIdLayout, setCompanyIdLayout] = useState<string>("Company ID");

	const handleItemClick = (companyId: any, companyName: string) => {
		setCompanyId(companyId);
		setCompanyIdLayout(companyName);

		if (detailsRef.current) {
			detailsRef.current.removeAttribute("open");
		}
	};

	const saveClientChanges = async () => {
		if (firstName === "" || firstName === undefined ||
			lastName === "" || lastName === undefined ||
			CI === "" || CI === undefined ||
			CNP === "" || CNP === undefined ||
			companyId === "" || companyId === undefined ||
			companyRole === "" || companyRole === undefined ||
			address === "" || address === undefined ||
			email === "" || email === undefined ||
			phone === "" || phone === undefined ||
			interests === "" || interests === undefined ||
			birthDate === "" || birthDate === undefined ||
			details === "" || details === undefined
		) {
			InfoPopup("Missing some required fields");
			return;
		}
		try {
			const response = await fetch(`/api/updateClients/${props.client?.ClientId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
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
					BirthDate: birthDate,
					Details: details,
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
	};

	const deleteClient = async () => {
		try {
			const response = await fetch(`/api/deleteClient/${props.client?.ClientId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				}
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			}
			props.deleteClient(props.ClientId);
			closeModal;
		} catch (error) {
			console.error(error);
		}
		window.location.reload();
	};

	const closeModal = () => {
		if (props.modalCheckboxRef.current) {
			props.modalCheckboxRef.current.checked = false;
		}
	};

	return (
		<>
			<input type="checkbox" ref={props.modalCheckboxRef} id={props.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-10">
						<label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>

						<input placeholder="First Name" value={firstName} className="flex items-center gap-3 p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setFirstName(e.target.value)} />
						<input placeholder="Last Name" value={lastName} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setLastName(e.target.value)} />
						<input placeholder="CI" value={CI} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCI(e.target.value)} />
						<input placeholder="CNP" value={CNP} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCNP(e.target.value)} />

						<details className="dropdown hidden p-2.5 sm:flex xl:p-5 text-black" ref={detailsRef}>
							<summary className="btn m-1">{companyIdLayout}</summary>
							<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
								{companiesArray?.map((company, index) => (
									<li key={index} onClick={() => handleItemClick(company.CompanyId, company.CompanyName)}><a>{company.CompanyName}</a></li>
								))}
							</ul>
						</details>

						<input placeholder="Company role" value={companyRole} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCompanyRole(e.target.value)} />
						<input placeholder="Address" value={address} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setAddress(e.target.value)} />
						<input placeholder="Email" value={email} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setEmail(e.target.value)} />
						<input placeholder="Phone" value={phone} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setPhone(e.target.value)} />
						<input placeholder="Interests" value={interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setInterests(e.target.value)} />
						<input placeholder="Birth date" value={birthDate} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setBirthDate(e.target.value)} />
						<input placeholder="Details" value={details} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setDetails(e.target.value)} />
						{props.secondButton === false ? (
							<>
								<input placeholder="Last email sent date" value={statusEmail.toString().split('T')[0]} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
								<input placeholder="Last SMS sent date" value={statusSMS.toString().split('T')[0]} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
							</>
						) : (
							<></>
						)}
					</div>
					<div className="modal-action">
						<button className="btn btn-info text-white" onClick={props.secondButton === false ? saveClientChanges : () => addClient(
							firstName,
							lastName,
							CI,
							CNP,
							companyId,
							companyRole,
							address,
							email,
							phone,
							interests,
							birthDate,
							details,
							props.modalId
						)}>Save</button>
						<button className="btn btn-outline btn-error"
							onClick={deleteClient}
							disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalClients;
