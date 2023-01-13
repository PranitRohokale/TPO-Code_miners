import React, { useEffect, useState } from "react";
import { supabase } from "../../../Utils/supabase.config";
import { useNavigate } from "react-router-dom";


// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PublicIcon from "@mui/icons-material/Public";

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

const TpoPolicy = () => {
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
	
    const role = "";
    supabase.auth.getSession().then((res) => {
      if (res?.data?.session?.user) setUserInfo(res?.data?.session);
      else navigate("/login");
      role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      if (role && role != "admin") navigate(`/${role}`);
    });
  }, []);

  const [academicYear, setAcademicYear] = useState("");
  const [circuitNormal, setCircuitNormal] = useState("");
  const [circuitDream, setCircuitDream] = useState("");

  const [nonCircuitNormal, setNonCircuitNormal] = useState("");
  const [nonCircuitDream, setNonCircuitDream] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      academicYear,
      circuitDream,
      circuitNormal,
      nonCircuitDream,
      nonCircuitNormal
    );
  };

  return (
    <div style={customStyles}>
      <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
        <div className="text-center text-2xl font-bold">TPO Policy</div>
        <div className="mt-4 sm:w-full sm:max-w-2xl m-auto">
          <div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Academic Year
                </label>
                <div className="mt-1">
                  <select
                    value={academicYear}
                    onChange={(e) => {
                      setAcademicYear(e.target.value);
                    }}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                  </select>
                </div>
              </div>

              <h2>For circuit Branches</h2>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upper limit for Normal Category
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="Limit"
                    value={circuitNormal}
                    onChange={(e) => setCircuitNormal(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upper limit for Dream Category
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="limit"
                    value={circuitDream}
                    onChange={(e) => setCircuitDream(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <h2>For Non Circuit Branches</h2>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upper limit for Normal Category
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="Limit"
                    value={nonCircuitNormal}
                    onChange={(e) => setNonCircuitNormal(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upper limit for Dream Category
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="name"
                    type="text"
                    placeholder="limit"
                    value={nonCircuitDream}
                    onChange={(e) => setNonCircuitDream(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoPolicy;
