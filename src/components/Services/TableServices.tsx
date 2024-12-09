'use client';
import React, { useEffect, useRef, useState } from "react";
import ModalServices, { addService } from "@/components/Services/ModalServices";
import Loader from "../common/Loader";
import useStore from "../common/StoreForSearch";
import { createHash } from 'crypto';
import InfoPopup from "../common/InfoPopup";
import GenerateTSV from "../common/GenerateTSV";

type service = {
	Id: any,
	Name: any,
	Description: any,
	Price: any,
}

const TableServices = () => {
	const [services, setServices] = useState<service[]>([]);
	const [filteredService, setFilteredService] = useState<service[]>([]);
	const searchTerm = useStore((state: any) => state.searchTerm);
	const setSearchTerm = useStore((state: any) => state.setSearchTerm);
	const userPermissions = sessionStorage.getItem("Level");

	const getServices = async () => {
		try {
			await fetch('api/readService', {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					setServices(data);
				})
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setSearchTerm("");
		getServices();
	}, []);

	useEffect(() => {
		const filtered = services.filter((service) =>
			service.Name?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			service.Description?.toString().includes(searchTerm?.toLocaleLowerCase()) ||
			service.Price?.toString().includes(searchTerm?.toLocaleLowerCase())
		);

		setFilteredService(filtered);
	}, [services, searchTerm]);

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];

			const reader = new FileReader();

			// Read the file as text
			reader.onload = async (e) => {
				let tsvLinesArray: any[] = [];
				const text = e.target?.result as string;

				// Split the file content by lines
				const lines = text.split('\n');

				// Iterate through lines
				for (let index = 0; index < lines.length; index++) {
					const line = lines[index];
					const [name, description, price] = line.split('\t'); // Split each line by tabs
					let addSuccessfuly: any = await addService(name, description, price);
					if (addSuccessfuly === "0") {
						tsvLinesArray.push(line);
					}
					console.log(`Row ${index + 1}:`, name + " " + description + " " + price);
				}

				console.log(tsvLinesArray.length);
				if (tsvLinesArray.length !== 0) {
					console.log(tsvLinesArray);
					GenerateTSV(tsvLinesArray);
					InfoPopup("Some services failed to be imported");
				} else {
					InfoPopup("Services imported successfuly");
				}
			};

			// Handle errors
			reader.onerror = (e) => {
				console.error("Failed to read file:", e);
				InfoPopup("Failed to read imported file");
			};

			reader.readAsText(file);
		}
	};

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="flex w-full">
				<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
					Services
				</h4>
				{userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
					<div className="w-full flex flex-col items-end">
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
					</div>
				) : (
					<></>
				)}
			</div>

			<div className="flex flex-col">
				<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
					<div className="p-2.5 xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Service Name
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Description
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Price
						</h5>
					</div>
				</div>

				{filteredService?.length > 0 ? (
					<div>
						{filteredService.map((service, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-3 ${key === services.length - 1
									? ""
									: "border-b border-stroke dark:border-strokedark"
									}`}>
									<div className="flex items-center gap-3 p-2.5 xl:p-5">
										<p className="hidden text-black dark:text-white sm:block">
											{service.Name}
										</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{service.Description}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-meta-3">{service.Price}</p>
									</div>

								</label>
								{userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
									<ModalServices Id={service.Id} modalId={`my_modal_${key}`} name={service.Name} description={service.Description} price={service.Price} secondButton={false} />
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
		</div >
	);
};

export default TableServices;
