import React, { useContext, useState } from "react";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PublicIcon from "@mui/icons-material/Public";

const Login = () => {

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

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, role)

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
                    Login
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
                                    Role
                                </label>
                                <div className="mt-1">
                                    <select
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value);
                                        }}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Recruiter">Recruiter</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <div className="mt-1 w-full">
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
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
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        id="email"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
