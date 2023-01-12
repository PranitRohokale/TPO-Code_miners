import React, { useContext, useState } from "react";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PublicIcon from "@mui/icons-material/Public";

const CreateJob = () => {

	const customStyles = {
		content: {
			top: "50%",
			left: "60%",
			right: "auto",
			bottom: "auto",
			width: "45%",
			display: "flex",
			flexDirection: "column",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [salary, setSalary] = useState(0);
	const [noOfRounds, setNoOfRounds] = useState(0);
	const [endDate,setEndDate] = useState("");
	const [location,setLocation] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
        let locationArr = location.split(",");
		console.log(title,desc,salary,noOfRounds,endDate,locationArr)
        
		// toast.success("Trying to register!");
		// try {
		// 	await registerUser(
		// 		name,
		// 		personalAdd,
		// 		emailId,
		// 		mobileNo,
		// 		gender,
		// 		dob
		// 	);
		// 	toast.success("Registration successfull!");
		// 	window.location.reload();
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	return (
		<div
			// isOpen={true}
			// onRequestClose={closeModal}
			style={customStyles}
			// contentLabel="Register"
		>
			<div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
				<div className="text-center text-2xl font-bold">
					Create a Job
				</div>
				<div className="mt-4 sm:w-full sm:max-w-2xl m-auto">
					<div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
						<form
							className="space-y-6 w-full"
							onSubmit={handleSubmit}
						>
							<div className="w-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Job Title
								</label>
								<div className="mt-1 w-full">
									<input
										id="name"
										type="text"
										placeholder="Job Title"
										value={title}
										onChange={(e) =>
											setTitle(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Job Description
								</label>
								<div className="mt-1">
									<input
										type="text"
										placeholder="Job Description"
										value={desc}
										onChange={(e) =>
											setDesc(e.target.value)
										}
										id="email"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Salary
								</label>
								<div className="mt-1">
									<input
										id="password"
										type="number"
										placeholder="Salary"
										value={salary}
										onChange={(e) =>
											setSalary(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div className="w-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									No of Rounds
								</label>
								<div className="mt-1 w-full">
									<input
										id="name"
										type="number"
										placeholder="No of Rounds"
										value={noOfRounds}
										onChange={(e) =>
											setNoOfRounds(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
                            
                            <div className="w-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Location
								</label>
								
                                <div className="mt-1 w-full">
									<input
										id="name"
										type="text"
										placeholder="Location (comma seperated if multiple eg a,b,c)"
										value={location}
										onChange={(e) =>
											setLocation(e.target.value)
										}
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
                            </div>
							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Create Job
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateJob;
