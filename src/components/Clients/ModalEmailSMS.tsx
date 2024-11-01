'use client';
import React, { useState } from 'react';
import Loader from '../common/Loader';
import InfoPopup from '../common/InfoPopup';

const ModalEmailSMS = (props: any) => {
    const [subject, setSubject] = useState<string>("Subject");
    const [composedEmailSMS, setComposedEmailSMS] = useState<string>("EMAIL FOR TEST");
    const [emailAddressesToSendEmailArray, setEmailAddressesToSendEmailArray] = useState<string[]>([]);
    const [phoneNumbersToSendSMSArray, setPhoneNumbersToSendSMSArray] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, email: string, phoneNr: string) => {
        if (event.target.checked) {
            setEmailAddressesToSendEmailArray(prevArray => [...prevArray, email]);
            setPhoneNumbersToSendSMSArray(prevArray => [...prevArray, phoneNr]);
        } else {
            setEmailAddressesToSendEmailArray(prevArray =>
                prevArray.filter(mail => mail !== email)
            );
            setPhoneNumbersToSendSMSArray(prevArray =>
                prevArray.filter(number => number !== phoneNr)
            );
        }
    }

    const sendEmails = async () => {
        if (emailAddressesToSendEmailArray.length === 0) {
            InfoPopup("Select clients to send emails");
            return;
        }
        for (let i = 0; i < emailAddressesToSendEmailArray.length; ++i) {
            try {
                const response = await fetch(`/api/sendEmail/${emailAddressesToSendEmailArray[i]}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Subject: subject,
                        EmailText: composedEmailSMS,
                    }),
                });
                if (!response.ok) {
                    InfoPopup(`Failed to send email to ${emailAddressesToSendEmailArray[i]}`);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
                InfoPopup(`Failed to send email to ${emailAddressesToSendEmailArray[i]}`);
            }
        }
        InfoPopup("Finished to send emails");
    }

    const sendSMSs = async () => {
        if (phoneNumbersToSendSMSArray.length === 0) {
            InfoPopup("Select clients to send SMS");
            return;
        }
        for (let i = 0; i < phoneNumbersToSendSMSArray.length; ++i) {
            try {
                const res = await fetch('/api/sendSMS', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        to: phoneNumbersToSendSMSArray[i], 
                        message: composedEmailSMS,
                    }),
                });

                const data = await res.json();
                if (!data.success) {
                    InfoPopup(`Failed to send SMS to ${phoneNumbersToSendSMSArray[i]}`);
                    throw new Error(`HTTP error! Status: ${data.error}`);
                }
            } catch (error) {
                console.log(`Error: ${error}`);
                InfoPopup(`Failed to send SMS to ${phoneNumbersToSendSMSArray[i]}`);
            }
        }
        // InfoPopup("Finished to send SMS");
    }

    return (
        <>
            <input type="checkbox" id={props.modalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-[70%] max-w-full">
                    <div className="grid grid-cols-1">
                        <label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>

                        <input placeholder="Type subject" value={subject} className="flex w-[98%] items-center p-2 text-black focus:outline-none focus:ring-0 focus:border-black" onChange={(e) => setSubject(e.target.value)} />
                        <textarea placeholder="Compose email or SMS" value={composedEmailSMS} className="flex h-29 items-center justify-center p-2 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500" onChange={(e) => setComposedEmailSMS(e.target.value)} />

                        <div className="flex flex-col">
                            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
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
                                <div className="p-2.5 text-center xl:p-5">
                                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                                        Phone
                                    </h5>
                                </div>
                            </div>

                            {props.filteredClients?.length > 0 ? (
                                <div>
                                    {props.filteredClients.map((client: any, key: any) => (
                                        <div key={key}>
                                            <div className={`grid grid-cols-3 sm:grid-cols-4 ${key === props.filteredClients.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}>
                                                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                                    <p className="hidden text-black dark:text-white sm:block">
                                                        <input type="checkbox" className="checkbox checkbox-info" onChange={(event) => handleCheckboxChange(event, client.Email, client.Phone)} />
                                                    </p>
                                                    {client.FirstName}
                                                </div>

                                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                                    <p className="text-black dark:text-white">{client.LastName}</p>
                                                </div>

                                                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                                    <p className="text-meta-5">{client.Email}</p>
                                                </div>

                                                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                                    <p className="text-meta-5">{client.Phone}</p>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Loader />
                            )}
                        </div>
                    </div>

                    <div className="modal-action">
                        <button className="btn"
                            style={{ color: 'white', backgroundColor: '#007bff', padding: '10px 20px', margin: '0.5rem' }}
                            onClick={sendEmails}
                        >
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
                        </button>
                        <button className="btn"
                            style={{ color: 'white', backgroundColor: '#007bff', padding: '10px 20px', margin: '0.5rem' }}
                            onClick={sendSMSs}
                        >
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 6.5C21 5.12 19.88 4 18.5 4H5.5C4.12 4 3 5.12 3 6.5V17.5C3 18.88 4.12 20 5.5 20H16.5L21 24V6.5Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />
                                <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" />
                                <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" />
                                <line x1="7" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>

                        {/* <label htmlFor={props.modalId} className="btn btn-info text-white" onClick={props.secondButton === false ? saveClientChanges : addClient}>Save</label>
                        <button className="btn btn-outline btn-error" onClick={deleteClient} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalEmailSMS;
