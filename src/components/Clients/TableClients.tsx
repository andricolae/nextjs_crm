'use client';
import React, { useEffect, useState, useRef } from "react";
import ModalClients from "@/components/Clients/ModalClients";
import Loader from "../common/Loader";
import useStore from "../common/StoreForSearch";
import "./style.css";
import ModalEmailSMS from "./ModalEmailSMS";
import { createHash } from 'crypto';

type client = {
	ClientId: any,
	FirstName: any,
	LastName: any,
	CI: any,
	CNP: any,
	CompanyId: any,
	CompanyRole: any,
	Address: any,
	Email: any,
	Phone: any,
	Interests: any,
}

const TableClients = () => {
	const userPermissions = sessionStorage.getItem("Level");
	const [clients, setClients] = useState<client[]>([]);
	const [filteredClients, setFilteredClients] = useState<client[]>([]);
	const searchTerm = useStore((state: any) => state.searchTerm);
	const setSearchTerm = useStore((state: any) => state.setSearchTerm);
	const [companiesArray, setCompaniesArray] = useState<{ CompanyId: string, CompanyName: string }[]>(JSON.parse(sessionStorage.getItem("companiesArray") || "[]"));
	const modalCheckboxRef = useRef<HTMLInputElement>(null);

	const getClients = async () => {
		try {
			await fetch(`/api/readClient`, {
				method: 'GET',
			}).then(response => response.json())
				.then(data => {
					setClients(data);
					setFilteredClients(data);
				})
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		setSearchTerm("");
		getClients();
	}, []);


	useEffect(() => {
		const filtered = clients.filter((client) =>
			client.FirstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.LastName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.CI?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.CNP?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.CompanyId?.toString().includes(searchTerm?.toLowerCase()) ||
			client.CompanyRole?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.Address?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.Email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.Phone?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
			client.Interests?.toLowerCase().includes(searchTerm?.toLowerCase())
		);

		setFilteredClients(filtered);
	}, [searchTerm, clients]);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			console.log("Selected file:", file);
		}
	};

	// const deleteClient = (clientId: string) => {
	//     setFilteredClients(filteredClients.filter(item => item.ClientId !== clientId));
	// }

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="flex w-full">
				<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
					Clients
				</h4>

				<div className="w-full flex flex-col items-end">
					<h6>
						<label htmlFor="modalEmailSMS" className="btn" style={{ color: 'white', backgroundColor: '#007bff', margin: '3px' }}>
							<svg
								className="fill-current"
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
									fill=""
								/>
							</svg>
						</label>
						<ModalEmailSMS modalId="modalEmailSMS" filteredClients={filteredClients} />
						{userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
							<button className="btn" style={{ color: 'white', backgroundColor: '#007bff', margin: '3px' }} onClick={handleButtonClick}>
								<svg
									className="fill-current"
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 3V15M12 3L8 7M12 3L16 7M4 20H20M4 20V16M20 20V16"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<input
									type="file"
									ref={fileInputRef}
									style={{ display: 'none' }}
									accept=".tsv"
									onChange={handleFileChange}
								/>
							</button>
						) : (
							<></>
						)}
					</h6>
				</div>
			</div>

			<div className="flex flex-col">
				<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-10">
					<div className="p-2.5 xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							First Name
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Last Name
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							CI
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							CNP
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base whitespace-nowrap">
							Company
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Role
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Address
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Email
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Phone
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Interests
						</h5>
					</div>
				</div>

				{filteredClients?.length > 0 ? (
					<div>
						{filteredClients.map((client, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-10 ${key === clients.length - 1
									? ""
									: "border-b border-stroke dark:border-strokedark"
									}`}>
									<div className="flex items-center gap-3 p-2.5 xl:p-5">
										<p className="hidden text-black dark:text-white sm:block">
											{client.FirstName}
										</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{client.LastName}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-meta-3">{client.CI}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-black dark:text-white">{client.CNP}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">
											{companiesArray.find(comp => comp.CompanyId === client.CompanyId)?.CompanyName || "Unknown"}
										</p>
									</div>
									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.CompanyRole}</p>
									</div>
									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.Address}</p>
									</div>
									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.Email}</p>
									</div>
									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.Phone}</p>
									</div>
									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.Interests}</p>
									</div>
								</label>
								{userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
									<ModalClients
										// deleteClient={deleteClient} 
										modalCheckboxRef={modalCheckboxRef}
										clientId={client.ClientId} modalId={`my_modal_${key}`} firstName={client.FirstName} lastName={client.LastName} CI={client.CI} CNP={client.CNP} companyId={client.CompanyId}
										companyRole={client.CompanyRole} address={client.Address} email={client.Email} phone={client.Phone} interests={client.Interests} secondButton={false} />
								) : (
									<></>
								)}
							</div>
						))}
					</div>
				) : (
					<Loader />
				)}

			</div>
		</div>
	);
};

export default TableClients;
