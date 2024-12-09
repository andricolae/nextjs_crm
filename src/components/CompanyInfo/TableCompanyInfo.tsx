'use client';
import { useEffect, useRef, useState } from "react";
import ModalCompany from "./ModalCompany";
import Loader from "../common/Loader";
import useStore from "../common/StoreForSearch";
import { createHash } from 'crypto';

type company = {
	CompanyId: any,
	CompanyName: any,
	TVA: any,
	Shareholders: any,
	CIF: any,
	COM: any,
	Headquarter: any,
	Subsidiary: any,
	MainActivity: any,
	SecondaryActivity: any,
	Interests: any,
}

const TableCompanyInfo = () => {
	const userPermissions = sessionStorage.getItem("Level");
	const [companies, setCompanies] = useState<company[]>([]);
	const [filteredCompany, setFilteredCompany] = useState<company[]>([]);
	const searchTerm = useStore((state: any) => state.searchTerm);
	const setSearchTerm = useStore((state: any) => state.setSearchTerm);

	const getCompanies = async () => {
		try {
			await fetch(`/api/readCompanyInfo`, {
				method: 'GET',
			})
				.then(response => response.json())
				.then(data => {
					setCompanies(data);
				})
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setSearchTerm("");
		getCompanies();
	}, []);

	useEffect(() => {
		const filtered = companies.filter((company) =>
			company.CompanyName?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.TVA?.toString().includes(searchTerm?.toLocaleLowerCase()) ||
			company.Shareholders?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.CIF?.toString().includes(searchTerm?.toLocaleLowerCase()) ||
			company.COM?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.Headquarter?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.Subsidiary?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.MainActivity?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.SecondaryActivity?.toLowerCase().includes(searchTerm?.toLocaleLowerCase()) ||
			company.Interests?.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
		);

		setFilteredCompany(filtered);
	}, [companies, searchTerm]);

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

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="flex w-full">
				<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
					Companies
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
				<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-10">
					<div className="p-2.5 xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Name
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							TVA
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Shareholders
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							CIF
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							COM
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Headquarter
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Subsidiary
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base whitespace-nowrap">
							Main Activity
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base whitespace-nowrap">
							Second Activity
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Interests
						</h5>
					</div>
				</div>
				{filteredCompany?.length > 0 ? (
					<div>
						{filteredCompany.map((company, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-10 ${key === companies.length - 1
									? ""
									: "border-b border-stroke dark:border-strokedark"
									}`} key={key}>

									<div className="flex items-center gap-3 p-2.5 xl:p-5">
										<p className="hidden text-black dark:text-white sm:block">
											{company.CompanyName}
										</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{company.TVA}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-meta-3">{company.Shareholders}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-black dark:text-white">{company.CIF}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{company.COM}</p>
									</div>
									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{company.Headquarter}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-meta-3">{company.Subsidiary}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-black dark:text-white">{company.MainActivity}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{company.SecondaryActivity}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{company.Interests}</p>
									</div>
								</label>
								{userPermissions === createHash('sha512').update("admin", 'utf8').digest('hex') ? (
									<ModalCompany companyId={company.CompanyId} modalId={`my_modal_${key}`} companyName={company.CompanyName} TVA={company.TVA} shareholders={company.Shareholders}
										CIF={company.CIF} COM={company.COM} headquarter={company.Headquarter} subsidiary={company.Subsidiary}
										mainActivity={company.MainActivity} secondaryActivity={company.SecondaryActivity} interests={company.Interests} secondButton={false} />
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

export default TableCompanyInfo;
