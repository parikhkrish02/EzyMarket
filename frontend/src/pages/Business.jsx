import React, { useContext, useEffect, useState } from 'react'
import UserProfileContext from '../context/UserProfile/UserProfileContext';
import './Business.css'

const Business = () => {

	const { userProfile } = useContext(UserProfileContext)
	const isNotBusiness = !userProfile?.isBusiness

	const [businessName, setBusinessName] = useState('')
	const [businessSlug, setBusinessNameSlug] = useState('')
	const [businessCategory, setBusinessCategory] = useState('')
	const [contactNo, setContactNo] = useState(0)

	useEffect(() => {
		if (!isNotBusiness) {
			// Fetch data and show as inital value
		}
		if (businessName || businessSlug || businessCategory || contactNo) {
			console.log('Hello World');
		}
		// eslint-disable-next-line
	}, [isNotBusiness])

	const changeBusinessName = (e) => {
		setBusinessName(e.target.value);
	}
	const changeBusinessSlug = (e) => {
		setBusinessNameSlug(e.target.value);
	}
	const changeBusinessCategory = (e) => {
		setBusinessCategory(e.target.value);
	}
	const changeContactNo = (e) => {
		setContactNo(e.target.value);
	}

	const submit = async () => {
		console.log(businessName);
		let response = await fetch(`${process.env.React_App_BACKEND_HOST}/api/business/addBusiness/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "businessName": businessName, "businessNameSlug": businessSlug, "contactNo": contactNo, "businessCategory": businessCategory })
		})
		if (response.status === 200) {

		}
	}


	return (
		<>
			<div className="header shadow-lg pb-4 pt-2">
				<img src="/images/EzyMarket.png" className="h-16 ml-[200px]" id="ezylogo" alt="" />
			</div>

			<div className="container mx-auto">
				<div className="flex justify-center my-6">

					<div className="w-full xl:w-3/4 lg:w-11/12 flex">

						<div className="bg-gray-400 hidden lg:block lg:w-5/12 h-full rounded-l-lg">
							<div className="image bg-[#08744c] h-full">
								<img src="/images/busnereg.png" alt="" className="pt-64 pl-16" />
								<div className="hedinginphto leading-wide text-5xl ml-28 font-semibold text-[#d8ece4]">
									Ezy Market
								</div>
							</div>
						</div>

						<div className="w-full  lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
							<h3 className="pt-4 font-sans font-bold p-6 text-[#186444] text-5xl text-center">
								{isNotBusiness ?
									<>Register Your Business</>
									:
									<>Edit Business</>
								}
							</h3>
							<form className=" bg-white rounded">
								<div
									className="businessinfo text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline p-4">
									<div className="mb-4">
										<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email" onChange={changeBusinessName}>
											Business Name
										</label>
										<input
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											id="email" type="email" placeholder="Enter Business Name" />
									</div>
									<div className="mb-4">
										<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email2" onChange={changeBusinessSlug}>
											Business Slug
										</label>
										<input
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											id="email2" type="email2" placeholder="Enter Business Name" />
									</div>

									<label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Address</label>
									<textarea id="message" rows="4"
										className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										placeholder="Enter Your full Address here...">
									</textarea>

									<div className="mb-4">
										<label className="block mt-6 mb-2 text-sm font-bold text-gray-700" htmlFor="Location">
											Location
										</label>
										<input
											className="w-80 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											id="Location" type="Location" placeholder="Location.." />
										<button
											className="bg-[#186444] ml-8 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
											type="button">
											<i className="fas fa-heart"></i> Detect
										</button>
									</div>
								</div>

								<div
									className="bbuscont mt-8 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline p-4">
									<div className="mb-4">
										<label className="block mb-2 mt-4 text-sm font-bold text-gray-700" htmlFor="Contact" onChange={changeContactNo}>
											Contact Number
										</label>
										<input
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											id="Contact" type="Contact" placeholder="Enter Business Contact Number" />
									</div>
									<div className="mb-4">
										<label className="block mb-2 mt-8 text-sm font-bold text-gray-700" htmlFor="Businessemail">
											Business Email
										</label>
										<input
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											id="Businessemail" type="Businessemail" placeholder="Enter Business Email" />
									</div>
								</div>
								<div
									className="businessinfo mt-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline p-4">
									<div className="mb-4 ">
										<label className="block mb-2 mt-4 text-sm font-bold text-gray-700" htmlFor="Category" onChange={changeBusinessCategory}>
											Enter Business Category
										</label>
										<input
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											id="Category" type="Category" placeholder="Ex. Street Vendor, Restaurant, Cafe , Stationery, etc..." />
									</div>

								</div>


								<div className=" mt-6 text-center">
									<button onClick={submit}
										className="w-full mt-4 px-4 py-2 font-bold text-white bg-[#186444] rounded-full hover:bg-[#08744c] focus:outline-none focus:shadow-outline"
										type="button">
										{isNotBusiness ?
											<>Register Business</>
											:
											<>Edit Business</>
										}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Business