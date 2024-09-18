import ModalCompany from "../common/ModalCompany";

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

const TableCompanyInfo = async () => {
    const res = await fetch('http://localhost:3000/api/readCompanyInfo', {
        cache: 'no-store'
    });
    const companies: company[] = await res.json();

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Companies
            </h4>

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

                {companies.map((company, key) => (
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
                        <ModalCompany id={`my_modal_${key}`} companyName={company.CompanyName} TVA={company.TVA} shareholders={company.Shareholders} 
                        CIF={company.CIF} COM={company.COM} headquarter={company.Headquarter} subsidiary={company.Subsidiary} 
                        mainActivity={company.MainActivity} secondaryActivity={company.SecondaryActivity} interests={company.Interests}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableCompanyInfo;
