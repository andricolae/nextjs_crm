'use client'
import React, {useEffect, useState} from "react";
import ModalServices from "@/components/common/ModalServices";
import Loader from "../common/Loader";

type client = {
    Id: any,
    Name: any,
    Description: any,
    Price:any,
}

const TableServices = () => {
    const [services, setServices] = useState<client[]>([]);

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
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Services
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-10">
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

                {services?.length > 0 ? (
                    <div>
                        {services.map((service, key) => (
                            <div key={key}>
                                <label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-10 ${key === services.length - 1
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
                                <ModalServices Id={service.Id} modalId={`my_modal_${key}`} Name={service.Name} Description={service.Description} Price={service.Price} secondButton={false} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Loader />
                )}

            </div>
        </div>
    );
}

export default TableServices;