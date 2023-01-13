import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import { CREATE_NEW_ADMIN_MUTATION } from "../../../Graphql/Mutations/admin";
import { useMutation } from '@apollo/client';

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

const RegisterAdmin = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      console.log(res);
      const role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      if (role) navigate(`/${role}`);
      setUserInfo(res?.data?.session?.user);
    });

    console.log(userInfo);
  }, []);

  const [firstName, setfirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");

  const [adminRegister, { adminData, adminLoading, adminError }] = useMutation(CREATE_NEW_ADMIN_MUTATION);

  const handleSubmit = async (e) => {
    // const { error } = await supabase.auth.signOut(); 
    if (!(firstName && middleName && lastName && emailId && gender && dob && password))
    return alert("All fields required");

    e.preventDefault();
    console.log(
      firstName,
      middleName,
      lastName,
      emailId,
      gender,
      dob,
      password
    );

    const { data, error } = await supabase.auth.signUp({
      email: emailId,
      password: password,
      options: {
        data: {
          role: "admin",
        },
      },
    });
    console.log(data,"data")

    if (!error) {
      setUserInfo(data?.session);
      adminRegister({
        variables: {
          objects: [
            {
              "id": data.user.id,
              "firstName": firstName,
              "lastName": lastName,
              "middleName": middleName,
              "gender": gender,
              "clgEmail": emailId
            }
          ]
        }
      })
    console.log(adminData, adminError,adminLoading, "after gql query")

      navigate("/login");
    } else alert(error?.message);
  };

  return (
    <div
      style={customStyles}
      // contentLabel="Register"
    >
      <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
        <div className="text-center text-2xl font-bold">
          Register as a admin
        </div>
        <div className="mt-4 sm:w-full sm:max-w-2xl m-auto">
          <div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="firstname"
                    type="text"
                    placeholder="Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value.trim())}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="middlename"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle Name
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value.trim())}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="lastname"
                    type="text"
                    placeholder="Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.trim())}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  College Email address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    placeholder="Email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value.trim())}
                    id="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "45%" }}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    dob
                  </label>
                  <div className="mt-1">
                    <input
                      id="dob"
                      type="date"
                      placeholder="DOB"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value.trim())}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div style={{ width: "45%" }}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div className="mt-1">
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value.trim());
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      {/* <option value="other">Cannot specify</option> */}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
