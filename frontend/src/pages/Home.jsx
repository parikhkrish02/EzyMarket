import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {

    return (
        <>
            <main className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-rows-1 grid-flow-col gap-4 flex-1 overflow-y-hidden">

                    <div className="flex one h-screen border-r-[3px] pt-60 sm:pl-0 lg:pl-20 sm:pr-4 lg:pr-48 font-sans font-bold text-3xl fixed hover:bg-[#faf2c8] ease-in-out duration-500 hover:text-[#186444] sm:invisible lg:visible">
                        <div>Good Morning!!</div>

                        <div>
                            <img alt=""
                                src="images/depositphotos_301350052-stock-illustration-cute-smiling-suns-smile-sun_prev_ui.png"
                                className="h-12 pl-6"
                            />
                        </div>
                    </div>

                    <div id="header" className="sdoind sm:ml-[350px] lg:ml-[605px]">
                        <Outlet />
                    </div>

                </div>
            </main>
        </>
    )
}

export default Home