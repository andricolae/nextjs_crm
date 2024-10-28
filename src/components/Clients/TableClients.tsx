'use client'
import React, { useEffect, useState } from "react";
import ModalClients from "@/components/common/ModalClients";
import Loader from "../common/Loader";
import useStore from "../common/StoreForSearch";

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
    const [clients, setClients] = useState<client[]>([]);
    const [filteredClients, setFilteredClients] = useState<client[]>([]);
    const searchTerm = useStore((state) => state.searchTerm);
    const setSearchTerm = useStore((state) => state.setSearchTerm);

    const getClients = async () => {
        let value = sessionStorage.getItem("akrapovik");
        if (value != "gintani") {
            window.location.href = "/";
        }
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

    return (
        <div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Clients
            </h4>

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
                            Company ID
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
                                        <p className="text-meta-5">{client.CompanyId}</p>
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
                                <ModalClients clientId={client.ClientId} modalId={`my_modal_${key}`} firstName={client.FirstName} lastName={client.LastName} CI={client.CI} CNP={client.CNP} companyId={client.CompanyId}
                                    companyRole={client.CompanyRole} address={client.Address} email={client.Email} phone={client.Phone} interests={client.Interests} secondButton={false} />
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
