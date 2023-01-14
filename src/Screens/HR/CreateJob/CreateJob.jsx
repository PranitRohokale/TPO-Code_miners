import React, { useEffect, useState } from "react";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Utils/supabase.config";
import Sidebar from "../../../Components/hrSidebar/Sidebar";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NEW_JOB_MUTATION } from "../../../Graphql/Mutations/recruter";
import { GET_RECRUTER_INFO } from "../../../Graphql/Queries/recruter";
import moment from "moment";

const branches = [
  {
    name: "Electrical",
  },
  {
    name: "Civil",
  },
  {
    name: "Mechanical",
  },
  {
    name: "EXTC",
  },
  {
    name: "Electronics",
  },
  {
    name: "Textile",
  },
  {
    name: "Computer",
  },
  {
    name: "IT",
  },
  {
    name: "Mechanical",
  },
];

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

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [salary, setSalary] = useState(0);
  const [noOfRounds, setNoOfRounds] = useState(0);
  // const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [ssc, setSsc] = useState(0);
  const [hsc, setHsc] = useState(0);
  const [cpi, setCpi] = useState(0);
  const [allowedGender, setAllowedGender] = useState("");
  const [allowedProgramme, setAlloweProgramme] = useState("");
  const [addReq, setAddReq] = useState("");
  const [timeDeadline, setTimeDeadline] = useState("11:59");
  const [dateDeadline, setDateDeadline] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const [createNewJob, { jobData, jobloading, jobError }] = useMutation(
    CREATE_NEW_JOB_MUTATION
  );

  const { data, loading, error } = useQuery(GET_RECRUTER_INFO, {
    variables: {
      _eq: userInfo,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const role = "";
    supabase.auth.getSession().then((res) => {
      if (res?.data?.session?.user)
        console.log(" HR ", res?.data?.session?.user);
      else navigate("/login");

      console.log(res?.data?.session?.user?.id);
      setUserInfo(res?.data?.session?.user?.id);
      const role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      console.log(role);
      if (role && role != "hr") navigate(`/${role}`);
    });
  }, [userInfo]);

  console.log(userInfo, data, error, "getinfo");

  const [checkedState, setCheckedState] = useState(
    new Array(branches.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!(title && desc && salary && noOfRounds && location && dateDeadline))
    //   return alert("All fields required");

    let branchArr = [];
    checkedState.forEach((item, index) => {
      if (item == true) {
        branchArr.push(branches[index].name);
      }
    });
    let genderArr = [];
    let programmeArr = [];
    if (allowedGender === "female") {
      genderArr.push("female");
    } else if (allowedGender === "male") {
      genderArr.push("male");
    } else {
      genderArr.push("female");
      genderArr.push("male");
    }

    if (allowedProgramme === "btech") {
      programmeArr.push("btech");
    } else if (allowedProgramme === "mtech") {
      programmeArr.push("mtech");
    } else {
      programmeArr.push("btech");
      programmeArr.push("mtech");
    }
    if (!isNaN(cpi)) {
      setCpi(parseFloat(cpi));
    } else {
      setCpi(0);
    }
    console.log(branchArr, genderArr, programmeArr);
    console.log(
      title,
      desc,
      salary,
      noOfRounds,
      location,
      ssc,
      hsc,
      cpi,
      allowedGender,
      allowedProgramme,
      addReq,
      timeDeadline,
      dateDeadline
    );

    const encodeString = (arr = []) => {
      arr = arr.map((e) => e.trim().toLowerCase());

      return arr.join(",");
    };

    const toTimestamp = (strDate) => {
      const dt = moment(strDate).unix();
      return dt;
    };

    const company = data?.Recruiters?.[0]?.companyName;

    const variables = {
      newJob: {
        title: title,
        description: desc,
        salary: salary,
        endDateToApply: dateDeadline,
        locations: location,
        recruterId: userInfo,
        companyName: company,
        noOfRounds: noOfRounds,
        Job_Requirements: {
          data: {
            cpi,
            column_10th: ssc,
            column_12th: hsc,
            allowedGenders: encodeString(genderArr),
            allowedBranches: encodeString(branchArr),
            allowedPrograms: encodeString(programmeArr),
          },
        },
      },
    };

    // console.log("DATA ", userData);
    console.log("varvariables ", variables);

    createNewJob({ variables });
    alert("new Job is created!!");

    setTitle("");
    setDesc("");
    setSalary(0);
    setNoOfRounds(0);
    setLocation("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{ width: "100%" }}
        // style={customStyles}
      >
        <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
          <div className="text-center text-2xl font-bold">Create a Job</div>
          <div className="mt-4 sm:w-full sm:max-w-2xl m-auto">
            <div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
              <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title*
                  </label>
                  <div className="mt-1 w-full">
                    <input
                      id="name"
                      type="text"
                      placeholder="Job Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Description*
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder="Job Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      id="email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="w-full mr-5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Salary*
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        type="number"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) => setSalary(Math.max(0, e.target.value))}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      No of Rounds*
                    </label>
                    <div className="mt-1 w-full">
                      <input
                        id="name"
                        type="number"
                        placeholder="No of Rounds"
                        value={noOfRounds}
                        onChange={(e) =>
                          setNoOfRounds(Math.max(0, e.target.value))
                        }
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location*
                  </label>

                  <div className="mt-1 w-full">
                    <input
                      id="name"
                      type="text"
                      placeholder="Location (comma seperated if multiple eg a,b,c)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <h2>Job Requirements</h2>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="w-full pr-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      10th
                    </label>
                    <div className="mt-1 w-full">
                      <input
                        id="10th"
                        type="number"
                        placeholder="10th"
                        value={ssc}
                        onChange={(e) => setSsc(Math.max(0, e.target.value))}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full pr-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      12th
                    </label>
                    <div className="mt-1 w-full">
                      <input
                        id="12th"
                        type="number"
                        placeholder="12th"
                        value={hsc}
                        onChange={(e) => setHsc(Math.max(0, e.target.value))}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CPI
                    </label>
                    <div className="mt-1 w-full">
                      <input
                        id="cpi"
                        type="text"
                        placeholder="CPI"
                        value={cpi}
                        onChange={(e) => setCpi(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ width: "50%", paddingRight: "20px" }}>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Allowed Programme
                    </label>
                    <div className="mt-1">
                      <select
                        value={allowedProgramme}
                        onChange={(e) => {
                          setAlloweProgramme(e.target.value.trim());
                        }}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="btech">B.Tech</option>
                        <option value="mtech">M.Tech</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ width: "50%" }}>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Allowed Gender
                    </label>
                    <div className="mt-1">
                      <select
                        value={allowedGender}
                        onChange={(e) => {
                          setAllowedGender(e.target.value.trim());
                        }}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="all">All</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                // style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Date*
                    </label>
                    <div className="mt-1">
                      <input
                        id="dob"
                        type="datetime-local"
                        placeholder="DOB"
                        value={dateDeadline}
                        onChange={(e) => {
                          setDateDeadline(e.target.value);
                          // console.log(e.target.value);
                        }}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Requirements
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      placeholder="Additional Requirements"
                      value={addReq}
                      onChange={(e) => setAddReq(e.target.value)}
                      id="email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Allowed Branches
                  </label>
                  <ul className="">
                    {branches.map(({ name, price }, index) => {
                      return (
                        <li key={index}>
                          <div className="toppings-list-item">
                            <div className="left-section">
                              <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={name}
                                value={name}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                              />
                              <label htmlFor={`custom-checkbox-${index}`}>
                                {name}
                              </label>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
