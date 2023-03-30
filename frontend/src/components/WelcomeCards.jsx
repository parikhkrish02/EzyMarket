import React from 'react'
import { Link } from 'react-router-dom'

const WelcomeCards = () => {

    return (
        <>
            <div className="flex space-x-8 mt-[40px]">
                <div>
                    <img alt="" src="/images/PIC1CARD.png" className="h-56 rounded-2xl max-w-xs transition duration-700 ease-in-out hover:scale-110" />
                    <p
                        className="pt-6 mb-4 text-lg font-semibold leading-6 tracking-tight text-gray-900 dark:text-black"
                    >
                        Let us Treat you with tasty food <br />
                        and drink around.
                    </p>
                </div>

                <div>
                    <img alt="" src="/images/PIC2crad.png" className="h-56 rounded-2xl max-w-xs transition duration-700 ease-in-out hover:scale-110" />
                    <p
                        className="pt-6 mb-4 text-lg font-semibold leading-6 tracking-tight text-gray-900 dark:text-black"
                    >
                        Go Colorful with your creative<br />
                        hands Check out Stationerys
                    </p>
                </div>
                <div>
                    <img alt="" src="/images/pic3card.png" className="h-56 rounded-2xl max-w-xs transition duration-700 ease-in-out hover:scale-110" />
                    <p
                        className="pt-6 mb-4 text-lg font-semibold leading-6 tracking-tight text-gray-900 dark:text-black"
                    >
                        Daily essentials for you, near you.
                    </p>
                </div>
            </div>

            <div>
                <h1
                    className="mb-4 pt-10 text-4xl font-extrabold leading-none tracking-wide text-gray-900 md:text-5xl lg:text-6xl dark:text-black"
                >
                    Ezy
                    <p className="text-[#186444] inline-block">Market</p>
                </h1>
                <h1
                    className="mb-4 text-xl font-normal leading-none tracking-wide text-gray-900 dark:text-black"
                >
                    Things gonna be<span> </span>
                    <p className="text-[#186444] inline-block">easy</p>
                    <span> </span> with us. Save your Time.
                </h1>
            </div>

            <Link to='/business-near-by' className="mt-7 ml-8 w-[750px] relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#08744C] transition duration-1000 ease-out border-2 border-[#186444] rounded-full shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-1000 -translate-x-full bg-[#08744C] group-hover:translate-x-0 ease">
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
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-[#08744C] transition-all duration-300 transform group-hover:translate-x-full ease font-sans tracking-wider text-lg">View NearBy Businesses</span>
                <span className="relative invisible">Button Text</span>
            </Link>
        </>
    )
}

export default WelcomeCards