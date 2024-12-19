"use client";
import React, { useEffect, useRef, useState } from "react";
import { createHash } from "crypto";
import ModalClients from "@/components/Clients/ModalClients";
import Loader from "@/components/common/Loader";
import useStore from "@/components/common/StoreForSearch";
import InfoPopup from "@/components/common/InfoPopup";
import HandleFileImport from "@/components/common/HandleFileImport";
import ModalEmailSMS from "@/components/Clients/ModalEmailSMS";
import "@/components/Clients/style.css";

type client = {
	ClientId: string,
	FirstName: string,
	LastName: string,
	CI: string,
	CNP: string,
	CompanyId: string,
	CompanyRole: string,
	Address: string,
	Email: string,
	Phone: string,
	Interests: string,
	BirthDate: string,
	Details: string,
	StatusEmail: string,
	StatusSMS: string
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
				method: "GET",
			}).then(response => {
				if (!response.ok) {
					InfoPopup("Failed to load clients");
				}
				return response.json()
			})
				.then(data => {
					setClients(data);
					// setFilteredClients(data);
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
			client.FirstName?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.LastName?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.CI?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.CNP?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.CompanyId?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.CompanyRole?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.Address?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.Email?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.Phone?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.Interests?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.BirthDate?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.Details?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.StatusEmail?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			client.StatusSMS?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "")
		);

		setFilteredClients(filtered);
	}, [searchTerm, clients]);

	const handleButtonClick = () => {
		const fileInput = document.getElementById("clientsImport") as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
			fileInput.click();
		}
	};

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="flex w-full">
				<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
					Clients
				</h4>

				<div className="w-full flex flex-col items-end">
					<h6>
						<label htmlFor="modalEmailSMS" className="btn" style={{ color: "white", backgroundColor: "#007bff", margin: "3px" }}>
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
						{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? (
							<>
								<button className="btn" style={{ color: "white", backgroundColor: "#007bff", margin: "3px" }} onClick={handleButtonClick}>
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
								</button>
								<input
									id="clientsImport"
									type="file"
									style={{ display: "none" }}
									accept=".tsv"
									onInput={(e) => HandleFileImport(e, "cl")}
								/>
							</>
						) : (
							<></>
						)}
					</h6>
				</div>
			</div>

			<div className="flex flex-col">
				<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
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
							Interests
						</h5>
					</div>
				</div>

				{filteredClients?.length > 0 ? (
					<div>
						{filteredClients.map((client, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-5 ${key === clients.length - 1
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

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">
											{companiesArray.find(comp => comp.CompanyId === client.CompanyId)?.CompanyName || "Unknown"}
										</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.CompanyRole}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{client.Interests}</p>
									</div>
								</label>
								{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? (
									<ModalClients modalCheckboxRef={modalCheckboxRef} modalId={`my_modal_${key}`}
										client={client} secondButton={false} />
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
