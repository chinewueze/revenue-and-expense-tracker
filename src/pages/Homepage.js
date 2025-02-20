
export const Home = () => {
    return (
        <div>
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
        </div>
    )
}
