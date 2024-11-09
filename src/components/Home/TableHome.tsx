'use client'
import { useEffect, useState } from "react";
import ModalCompany from "../CompanyInfo/ModalCompany";
import Loader from "../common/Loader";
import useStore from "../common/StoreForSearch";

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
    const [companies, setCompanies] = useState<company[]>([]);
    const [filteredCompany, setFilteredCompany] = useState<company[]>([]);
    const searchTerm = useStore((state) => state.searchTerm);
    const setSearchTerm = useStore((state) => state.setSearchTerm);

    const getEmailSMSstatuses = async () => {
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
    }

    useEffect(() => {
        setSearchTerm("");
        // getEmailSMSstatuses();
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

    return (
        <div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Emails and SMS sent
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
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
                            Email
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Phone
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
                                <ModalCompany companyId={company.CompanyId} modalId={`my_modal_${key}`} companyName={company.CompanyName} TVA={company.TVA} shareholders={company.Shareholders}
                                    CIF={company.CIF} COM={company.COM} headquarter={company.Headquarter} subsidiary={company.Subsidiary}
                                    mainActivity={company.MainActivity} secondaryActivity={company.SecondaryActivity} interests={company.Interests} secondButton={false} />
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
