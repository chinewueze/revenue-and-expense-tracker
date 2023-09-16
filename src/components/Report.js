import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
export const Report = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [reportData, setReportData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
    const shouldShowNoDataMessage = !isLoading && reportData.length === 0;
    const baseUrl = "https://revenue-and-expense-tracking-api.onrender.com";
    const apiKey = "85610977-daf5-438b-8263-9e6388ae1651";
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    useEffect(() => {
        if (isModalOpen) {
            const modalCloseTimer = setTimeout(() => {
                setIsModalOpen(false);
            }, modalDisplayDuration);
            return () => clearTimeout(modalCloseTimer);
        }
    }, [isModalOpen]);
    const checkNetworkStatus = () => {
        setIsOnline(navigator.onLine);
      };
    useEffect(() => {
        checkNetworkStatus();
        window.addEventListener("online", checkNetworkStatus);
        window.addEventListener("offline", checkNetworkStatus);
        return () => {
            window.removeEventListener("online", checkNetworkStatus);
            window.removeEventListener("offline", checkNetworkStatus);
        };
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        handleViewReport();
    };
    const resetForm = () => {
        setCategory("");
        setStartDate("");
        setEndDate("");
        setCategoryError("");
        setStartDateError("");
        setEndDateError("");
    };
    const handleViewReport = async () => {
        if (!isOnline) {
            setIsModalOpen(true);
            return;
        }
        try {
            let hasErrors = false;
            setCategoryError(!category ? "Please select a category." : "");
            setStartDateError(!startDate ? "Please select a start date." : "");
            setEndDateError(!endDate ? "Please select an end date." : "");
            if (!category || !startDate || !endDate) {
                hasErrors = true;
            }
            if (hasErrors) {
                return;
            }
            setIsLoading(true);
            const url = `${baseUrl}/view/${category}/report`;
            const params = {
                "start-date": startDate,
                "end-date": endDate,
            };
            const headers = {
                "Authorization": `ApiKey ${apiKey}`,
                "Content-Type": "application/json",
            };
            const response = await axios.get(url, { params, headers });
            setIsLoading(false);
            if (response.status === 200 && response.data.status) {
                setReportData(response.data.data);
                resetForm();
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const handleDownloadReport = async () => {
        if (!isOnline) {
            setIsModalOpen(true);
            return;
        }
        try {
            let hasErrors = false;
            setCategoryError(!category ? "Please select a category." : "");
            setStartDateError(!startDate ? "Please select a start date." : "");
            setEndDateError(!endDate ? "Please select an end date." : "");
            if (!category || !startDate || !endDate) {
                hasErrors = true;
            }
            if (hasErrors) {
                return;
            }
            setLoading(true);

            const url = `${baseUrl}/download/${category}/report`;
            const params = {
                "start-date": startDate,
                "end-date": endDate,
            };
            const headers = {
                "Authorization": `ApiKey ${apiKey}`,
                "Content-Type": "application/json",
            };
            const response = await axios.get(url, { params, headers, responseType: 'blob' });
            setLoading(false);

            if (response.status === 200) {
                var file = window.URL.createObjectURL(response.data);
                window.location.assign(file);
                resetForm();
            } else {
                setIsModalOpen(true);
            }
        } catch (error) {
            setLoading(false);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="overflow-x-hidden">
            {isModalOpen && !isOnline && (
                <div className="fixed inset-0 flex items-center justify-center relative">
                    <div className="bg-white p-6 rounded-lg w-2/6 absolute top-7">
                        <p className="text-lg font-semibold mb-4">No network/WiFi detected!</p>
                    </div>
                </div>
            )}
            <header className=" bg-gray-800 text-white">
                <div className=" flex items-center py-5 w-full ">
                    <div className="flex items-center  w-[15%] ml-[3%]  ">
                        <img src="assets/Images/logo.png" className="h-[8vh] rounded-full" />
                    </div>
                    <div className="  w-[65%]  ml-[5%] mr-[10%]">
                        <h2 className="font-bold text-2xl text-center "> St Louis Catholic Church </h2>
                    </div>
                    <div className="hidden lg:flex space-x-5 ml-[2%] mr-[5%]">
                        <Link to="/"
                            className={` hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                        >
                            Home
                        </Link>
                        <Link to="/revenue"
                            className={`hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                        >
                            Revenue
                        </Link>
                        <Link
                            to="/expenses"
                            className={` hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                        >
                            Expenses
                        </Link>
                        <Link
                            to="/reports"
                            className={`text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                        >
                            Reports
                        </Link>
                    </div>
                    <div className="lg:hidden">
                        <button
                            className="text-primary-100 p-2 focus:outline-none text-white mx-3"
                            onClick={toggleNavbar}
                        >
                            {isCollapsed ? (
                                <svg
                                    className={`w-6 h-6 ${isCollapsed ? "hidden" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className={`w-6 h-6`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                {isCollapsed && (
                    <div className="fixed inset-0 flex justify-end">
                        <div className={`w-[90%] bg-black h-[20vh]`}>
                            <div className="flex justify-end p-4 ">
                                <button
                                    className={` hover:text-blue-700 focus:outline-none`}
                                    onClick={toggleNavbar}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <ul className=" py-2 flex space-x-3  mx-[10%]">
                                <li>
                                    <Link to="/"
                                        className={` hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/revenue"
                                        className={`hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110`}
                                    >
                                        Revenue
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/expenses"
                                        className={`hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                                    >
                                        Expenses
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/reports"
                                        className={`text-yellow-600 hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                                    >
                                        Reports
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </header>
            <main className="bg-blue-50 py-[5%] ">
                <section className="pt-[3%] pb-[2%]">
                    <p className="text-xl text-center font-semibold font-serif ">
                        Capture Cash Revenue And Direct Bank Transfer.
                    </p>
                </section>
                <section>
                    <form className="bg-white sm:w-5/6  lg:w-fit mx-auto p-[3%] shadow-md shadow-black rounded-2xl" onSubmit={handleSubmit} >
                        <div className="lg:flex sm:block">
                            <div>
                                <label className="font-semibold">
                                    <span className="text-red-500"> *</span>Category<span> :</span>
                                </label>
                            </div>
                            <div>
                                <select className="lg:h-8 sm:h-9 p-1 lg:w-[450px] sm:w-full lg:ml-3 sm:mx-auto border-2 border rounded-lg hover:border-blue-500 cursor-pointer outline-none lg:my-0 sm:my-5" value={category} onChange={handleCategoryChange}>
                                    <option disabled selected value="">Select a Category</option>
                                    <option value="revenue"> Revenue </option>
                                    <option value="expenses"> Expense </option>
                                </select>
                                {categoryError && <p className="text-red-500 mx-[20%]">{categoryError} </p>}
                            </div>
                        </div>
                        <div className="lg:flex sm:block  lg:my-[4%]">
                            <div >
                                <label className="font-semibold">
                                    <span className="text-red-500">*</span>Start Date<span> :</span>
                                </label>
                            </div>
                            <div>
                                <div>
                                    <input type='date' className="outline-none outline-none h-9 p-1 lg:w-[500px] sm:w-full sm:mx-auto lg:ml-2 border-2 border rounded-lg hover:border-blue-500 placeholder-gray-500 italic ml-3  lg:my-0 sm:my-5 " value={startDate} onChange={handleStartDateChange} /> <br />
                                </div>
                                {startDateError && <p className="text-red-500 mx-[18%]">{startDateError}</p>}
                            </div>
                        </div>
                        <div className="lg:flex sm:block ">
                            <div >
                                <label className="font-semibold">
                                    <span className="text-red-500">*</span>End Date<span> :</span>
                                </label>
                            </div>
                            <div>
                                <div>
                                    <input type='date' className="outline-none outline-none h-9 p-1 lg:w-[500px] sm:w-full sm:mx-auto lg:ml-2 border-2 border rounded-lg hover:border-blue-500 placeholder-gray-500 italic ml-3  lg:my-0 sm:my-5 " value={endDate} onChange={handleEndDateChange} /> <br />
                                </div>
                                {endDateError && <p className="text-red-500 mx-[18%]">{endDateError}</p>}
                            </div>
                        </div>
                        <div className="flex lg:mx-[25%] sm:ml-[17%] my-[5%] w-full space-x-4 ">
                            <button
                                className="w-24 p-2 bg-orange-400 rounded-lg text-white"
                                onClick={handleViewReport}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                        View
                                    </>
                                ) : (
                                    "View"
                                )}
                            </button>
                            <button
                                className="w-28 p-2.5 bg-orange-400 rounded-lg text-white"
                                onClick={handleDownloadReport}
                                disabled={Loading}
                            >
                                {Loading ? (
                                    <div className="flex">
                                        <div>
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2 " />
                                        </div>
                                        <div>
                                            Download
                                        </div>
                                    </div>
                                ) : (
                                    "Download"
                                )}
                            </button>
                        </div>
                    </form>
                </section>
                <section className="mx-[5%] my-11 bg-white sm:overflow-x-scroll lg:overflow-x-hidden ">
                    <table className="w-[95%] mx-auto ">
                        <thead>
                            <th className="border-2 border-solid border-black w-[10%]  p-2"> S/N </th>
                            <th className="border-2 border-solid border-black w-[35%] p-2"> Item </th>
                            <th className="border-2 border-solid border-black w-[20%] p-2"> Amount </th>
                            <th className="border-2 border-solid border-black w-[15%] p-2"> Date </th>
                            <th className="border-2 border-solid border-black w-[20%] p-2"> Type </th>
                        </thead>
                        <tbody>
                            {reportData.map((entry, index) => (
                                <tr key={index}>
                                    <td className="border-2 border-solid border-black align-middle p-3"> {index + 1} </td>
                                    <td className="border-2 border-solid border-black align-middle p-3"> {entry.category} </td>
                                    <td className="border-2 border-solid border-black align-middle p-3"> {entry.amount} </td>
                                    <td className="border-2 border-solid border-black align-middle p-3"> {new Date(entry.date).toLocaleDateString("en-US")} </td>
                                    <td className="border-2 border-solid border-black align-middle p-3"> {entry.type} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {shouldShowNoDataMessage && (
                        <div className="h-[15vh] mb-3 text-center bg-white py-[6%]">
                            <p className="text-xl font-semibold font-serif ">
                                No data
                            </p>
                        </div>
                    )}
                </section>
            </main>
            <footer className="w-screen h-[3vh] text-lg font-semibold ">
                <p className="text-center ">
                    &copy; 2023 SafePAY by <span className="text-pink-800"> Instant Deposit Limited </span>
                </p>
            </footer>
        </div>
    )
}