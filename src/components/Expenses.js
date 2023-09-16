import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export const Expense = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDisplayDuration] = useState(4500);
    const [isOnline, setIsOnline] = useState(true);
    const baseUrl = "https://revenue-and-expense-tracking-api.onrender.com";
    const endpoint = "/capture/expenses";
    const apiKey = "85610977-daf5-438b-8263-9e6388ae1651";
    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };
    const checkNetworkStatus = () => {
        setIsOnline(window.navigator.onLine);
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
    const resetForm = () => {
        setCategory("");
        setAmount("");
        setDate("");
        setError({
            category: "",
            amount: "",
            date: "",
        });
    };
    const isInteger = (value) => /^\d+$/.test(value);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isOnline) {
            setIsModalOpen(true);
            return;
        }
        const newError = {
            category: !category ? "category is required" : "",
            amount: !amount ? "Please enter Amount!" : !isInteger(amount) ? "Please enter a valid number" : "",
            date: !date ? "date is required" : "",
        };
        setError(newError);
        if (Object.values(newError).some((message) => message !== "")) {
            return;
        }
        const newExpenseEntry = { category, amount, date };
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseUrl}${endpoint}`, newExpenseEntry, {
                headers: {
                    "Authorization": `ApiKey ${apiKey}`
                }
            });
            setIsModalOpen(true);
            if (response.status === 201) {
                resetForm();
            }
        } catch (error) {
            
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (isModalOpen) {
            const modalCloseTimer = setTimeout(() => {
                setIsModalOpen(false);
            }, modalDisplayDuration);
            return () => clearTimeout(modalCloseTimer);
        }
    }, [isModalOpen]);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="overflow-x-hidden">
            {isModalOpen && (
                <div className="relative inset-0 flex items-center justify-center">
                    {isOnline ? (
                        <div className="bg-white p-6 rounded-lg absolute top-7 w-2/5 ">
                            <p className="text-sm font-semibold mb-4"> <FontAwesomeIcon icon={faCheck} className="mr-1 text-white text-lg bg-green-500  rounded-xl" /> expense recorded </p>
                            <button className="px-4 py-2  text-white text-lg rounded-md font-semibold flex items-center absolute right-1 top-1 " onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} className="mr-2 text-black" />
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg absolute top-7 ">
                            <p className="text-sm font-semibold mb-4">No network/wifi detected!</p>
                            <button className="px-4 py-2  text-white rounded-md font-semibold flex items-center absolute right-1 top-1" onClick={closeModal}>
                                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                Close
                            </button>
                        </div>
                    )}
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
                        <Link
                            to="/revenue"
                            className={` hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                        >
                            Revenue
                        </Link>
                        <Link
                            to="/expenses"
                            className={` text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                        >
                            Expenses
                        </Link>
                        <Link
                            to="/reports"
                            className={`hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
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
                        <div className={`w-[90%] bg-black h-[18vh]`}>
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
                            <ul className=" py-2 flex space-x-3 mx-[10%]">
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
                                        className={`hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                                    >
                                        Revenue
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/expenses"  
                                        className= {`text-yellow-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                                    >
                                        Expenses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/reports"
                                        className={` hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110`}
                                    >
                                        Reports
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </header>
            <main className=" h-[85vh] bg-blue-50  ">
                <section className="pt-[7%] pb-[5%]">
                    <p className="text-xl text-center font-semibold font-serif ">
                        Capture All Church Expenses.
                    </p>
                </section>
                <section className=" ">
                    <form className="bg-white sm:w-5/6  lg:w-fit mx-auto p-[3%]" onSubmit={handleSubmit}>
                        <div className="lg:flex sm:block">
                            <div>
                                <label className="font-semibold">
                                    <span className="text-red-500"> *</span>Category<span> :</span>
                                </label>
                            </div>
                            <div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="lg:h-8 sm:h-9 p-1 lg:w-[500px] sm:w-full lg:ml-3 sm:mx-auto border-2 border rounded-lg hover:border-blue-500 cursor-pointer outline-none lg:my-0 sm:my-5 
                                ">
                                    <option disabled selected value="">Select a Category</option>
                                    <option> Allowances/Salaries(Priest,Deacons,Seminarians,Cathecist,Cook) </option>
                                    <option> Appeals Remittance Expense </option>
                                    <option> Assistance to Religious Expense </option>
                                    <option> Assistance to Smaller Parishes Expense </option>
                                    <option> Auto Maintenance Expense </option>
                                    <option> Auto Purchase Expense </option>
                                    <option> Bank Charges Expense </option>
                                    <option> Building Expense/New Building/Project Expenses </option>
                                    <option> Catholic Charities(Caritas) Expense </option>
                                    <option> Chancery Approved Levies Expense </option>
                                    <option> Chancery Monthly Returns(Levied Taxes) Expense </option>
                                    <option> Communications Expense(Internet/DSTV/Print Media) </option>
                                    <option> Feeding(Food and Drinks) Expense </option>
                                    <option> Furniture and Equipment Maintenance Expense </option>
                                    <option> Furniture and Equipment Purchase Expense </option>
                                    <option> Harvest Returns(Levied Tax) Expense </option>
                                    <option> Insurance Expense (Car, Medical, House) </option>
                                    <option> Land Purchases/Improvement Expense </option>
                                    <option> Laundry/Cleaning/Fumigation Expense </option>
                                    <option> Legal Expense </option>
                                    <option> Loans Repayment Expense </option>
                                    <option> Maintenance/Repairs Expense </option>
                                    <option> Mandatory Remittance Expense </option>
                                    <option> Medical(Minor)  Expenses </option>
                                    <option> Official Gifts(Bishop's Visit) Expense </option>
                                    <option> Pastoral AIDS(Cult) Expense </option>
                                    <option> Pre-Harvest Expense</option>
                                    <option>Sacrament of Confirmation Remittance Expense </option>
                                    <option>Scolarship Expense </option>
                                    <option>Seminar/Meeting/Workshop Expense/Retreat/Recollection </option>
                                    <option> Special Project Expense</option>
                                    <option> Transport/Travelling Expense</option>
                                    <option> Utilities-Generator Expense</option>
                                    <option> Utilities-NEPA Expense</option>
                                    <option> Utilities-Water and Cooking Gas Expense </option>
                                </select>
                                {error.category && <p className="text-red-500 text-sm mx-[30%] my-1">{error.category}</p>}
                            </div>
                        </div>
                        <div className="lg:flex items-center lg:my-[2%] sm:block">
                            <div className="flex items-center">
                                <label className="font-semibold">
                                    <span className="text-red-500">*</span>Amount
                                </label>
                                <span>:</span>
                            </div>
                            <div>
                                <div className="flex items-center w-full  lg:my-0 sm:my-5 ">
                                    <button className="bg-gray-300 w-8 lg:h-8 sm:h-9 rounded-l-lg flex-none ml-3 cursor-text">
                                        ₦
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="outline-none lg:h-8 sm:h-9 p-1 lg:w-[485px] sm:w-3/4  border-2 border rounded-r-lg my-[2%] hover:border-blue-500 flex-shrink-0"
                                    />
                                </div>
                                {error.amount && <p className="text-red-500 text-sm mx-[30%] my-1">{error.amount}</p>}
                            </div>
                        </div>
                        <div className="lg:flex sm:block ">
                            <div >
                                <label className="font-semibold">
                                    <span className="text-red-500">*</span>Date<span> :</span>
                                </label>
                            </div>
                            <div>
                                <div>
                                    <input type='date'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="outline-none outline-none h-9 p-1 lg:w-[500px] sm:w-full sm:mx-auto lg:ml-2 border-2 border rounded-lg hover:border-blue-500 placeholder-gray-500 italic ml-3  lg:my-0 sm:my-5 "
                                    /> <br />
                                </div>
                                {error.date && <p className="text-red-500 text-sm mx-[30%] my-1">{error.date}</p>}
                            </div>
                        </div>
                        <button
                            className="mx-[30%] mt-[6%] mb-2 w-36 p-2 bg-orange-400 rounded-lg text-white"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                    Save Entry
                                </>
                            ) : (
                                "Save Entry"
                            )}
                        </button>
                    </form>
                </section>
            </main>
            <footer className="w-screen text-lg font-semibold">
                <p className="text-center ">
                    &copy; 2023 SafePAY by <span className="text-pink-800"> Instant Deposit Limited </span>
                </p>
            </footer>
        </div>
    )
}


