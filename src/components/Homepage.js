import React, { useState } from "react";
import { Link } from 'react-router-dom'
export const Home = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="overflow-x-hidden">
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
                            className={`text-yellow-600 text-base font-medium`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/revenue"
                            className={` hover:text-yellow-600 text-base font-medium`}
                        >
                            Revenue
                        </Link>
                        <Link
                            to="/expenses"
                            className={` hover:text-yellow-600 text-base font-medium`}
                        >
                            Expenses
                        </Link>
                        <Link
                            to="/reports"
                            className={`hover:text-yellow-600 text-base font-medium`}
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
                            <ul className=" py-2 flex space-x-3 mx-[10%]">
                                <li>
                                    <Link
                                        to="/"
                                        className={`text-yellow-700 hover:text-blue-700 text-base font-medium block py-2`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/revenue"
                                        className={`hover:text-blue-700 text-base font-medium block py-2  `}
                                    >
                                        Revenue
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/expenses"
                                        className={`hover:text-blue-700 text-base font-medium block py-2 `}
                                    >
                                        Expenses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/reports"
                                        className={` hover:text-blue-700 text-base font-medium block py-2`}
                                    >
                                        Reports
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </header>
            <main className="lg:flex h-[85vh] bg-blue-50  ">
                <section className="-500 lg:w-2/5 py-[15%]">
                    <p className="text-3xl font-semibold font-serif sm:mx-[5%] lg:mx-[10%] ">
                        Manage Revenue and Expenses Easily With <span className="text-orange-400"> SafePAY </span>TrackerApp
                    </p>
                </section>
                <section className=" w-3/5 lg:pt-[8%] sm:pt-[7%] relative sm:mx-auto ">
                    <img src="assets/Images/homeban-2.png" className="absolute lg:right-[8%] delay-150 duration-700 ease-in-out lg:hover:scale-110 sm:hover:scale-125 " />
                </section>
            </main>
            <footer className="w-screen text-lg font-semibold">
                <p className="text-center">
                    &copy; 2023 SafePAY by <span className="text-pink-800"> Instant Deposit Limited </span>
                </p>
            </footer>
        </div>
    )
}
