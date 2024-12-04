import React, { useEffect, useState } from 'react'
import Loader from '../common/Loader';

type service = {
	Id: any,
	Name: any,
	Description: any,
	Price: any,
}

const ModalPDF = (props: any) => {
	const [services, setServices] = useState<service[]>([]);
	const [offerServicesArray, setServicesArray] = useState<string[]>([]);
	const [discountPercent, setDiscountPercent] = useState<string>("");
	const [offerDescription, setOfferDescription] = useState<string>("");

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
		getServices();
	}, []);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, service: string) => {
		if (event.target.checked) {
			setServicesArray(prevArray => [...prevArray, service]);
		} else {
			setServicesArray(prevArray =>
				prevArray.filter(services => services !== service)
			);
		}
	}

	return (
		<>
			<input type="checkbox" id={props.modalId} className="modal-toggle hidden" />
			<div className="modal h-full w-[98.4%] flex justify-center items-center">
				<div className="modal-box w-[100%] h-[100%] max-w-full overflow-hidden relative">
					<label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						X
					</label>
					<div className="h-full flex w-full">

						<div className="h-full flex flex-col">
							<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
								Services
							</h4>

							<div className="flex-grow overflow-y-auto">
								<div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
									<div className="p-2.5 xl:p-5">
										<h5 className="text-sm font-medium uppercase xsm:text-base">
											Service Name
										</h5>
									</div>
									<div className="p-2.5 text-center xl:p-5">
										<h5 className="text-sm font-medium uppercase xsm:text-base">
											Price
										</h5>
									</div>
								</div>

								{services?.length > 0 ? (
									<div>
										{services.map((service, key) => (
											<div key={key}>
												<label
													className={`grid grid-cols-2 sm:grid-cols-2 ${key === services.length - 1
														? ""
														: "border-b border-stroke dark:border-strokedark"
														}`}
												>
													<div className="flex items-center gap-3 p-2.5 xl:p-5">
														<p className="hidden text-black dark:text-white sm:block">
															<input type="checkbox" className="checkbox checkbox-info mr-2"
																onChange={(event) => handleCheckboxChange(event, service.Name)}
															/>
															{service.Name}
														</p>
													</div>

													<div className="flex items-center justify-center p-2.5 xl:p-5">
														<p className="text-meta-3">{service.Price}</p>
													</div>
												</label>
											</div>
										))}
									</div>
								) : (
									<Loader />
								)}
							</div>
						</div>

						<div className="divider divider-horizontal"></div>

						<div>
							<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
								Offer conditions
							</h4>

							<input type="number" placeholder="Discount percentage..." className="input input-bordered w-full max-w-xs"
								onChange={e => setDiscountPercent(e.target.value)} />

							<textarea className="textarea textarea-bordered h-[65%] w-full mt-5" placeholder="Offer description..."
								onChange={e => setOfferDescription(e.target.value)} />

							<button className="btn"
								style={{ color: 'white', backgroundColor: '#007bff', padding: '10px 20px', margin: '0.5rem' }}
							// onClick={sendSMSs}
							>Attach PDF</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ModalPDF;
