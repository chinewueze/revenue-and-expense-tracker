import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export const Header = () => {
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false);
        const toggleNavbar = () => {
            setIsCollapsed(!isCollapsed);
        };
    return(
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
                    className={` ${location.pathname==="/" ? "text-yellow-600": ""} hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                >
                    Home
                </Link>
                <Link
                    to="/revenue"
                    className={` ${location.pathname==="/revenue" ? "text-yellow-600": ""} hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                >
                    Revenue
                </Link>
                <Link 
                    to="/expenses"
                    className={`${location.pathname==="/expenses" ? "text-yellow-600": ""} hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
                >
                    Expenses
                </Link>
                <Link
                    to="/reports"
                    className={`${location.pathname==="/reports" ? "text-yellow-600": ""} hover:text-yellow-600 text-base font-medium delay-150 duration-700 ease-in-out hover:scale-x-110`}
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
                                className={`${location.pathname==="/" ? "text-yellow-600": ""} hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/revenue"
                                className={`${location.pathname==="/revenue" ? "text-yellow-600": ""} text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                            >
                                Revenue 
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/expenses"
                                className={`${location.pathname==="/expenses" ? "text-yellow-600": ""}hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110 `}
                            >
                                Expenses
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/reports"
                                className={`${location.pathname==="/reports" ? "text-yellow-600": ""} hover:text-blue-700 text-base font-medium block py-2 delay-150 duration-700 ease-in-out hover:scale-x-110`}
                            >
                                Reports
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )}
    </header>
    )
}