import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../Utils/isLoggedIn";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Utils/supabase.config";

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

const Login = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      setUserInfo(res?.data?.session?.user);
      console.log(res?.data?.session?.user);
      navigate("/");
    });

    console.log(userInfo);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, role);
    if (!(email && password && role)) {
      return alert("fill all fields");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (
      data?.session?.user?.user_metadata?.role?.toLowerCase() ==
      role.toLowerCase()
    )
      navigate("/");
  };

  return (
    <div
      // isOpen={true}
      // onRequestClose={closeModal}
      style={customStyles}
      // contentLabel="Register"
    >
      <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
        <div className="text-center text-2xl font-bold">Login</div>
        <div className="mt-4 sm:w-full sm:max-w-2xl m-auto">
          <div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
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
                    <option value="admin">Admin</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
