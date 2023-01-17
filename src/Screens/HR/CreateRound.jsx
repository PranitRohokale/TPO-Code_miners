import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Utils/supabase.config";
import { CREATE_NEW_ROUND } from "../../Graphql/Mutations/recruter";
import { useMutation } from "@apollo/client";

const CreateRound = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [round, setRound] = useState(0);
  const [isFinal, setIsFinal] = useState(false);
  const [roundDetails, setRoundDetails] = useState("");
  const [dateDeadline, setDateDeadline] = useState("");

  const [createNewRound, { jobData, jobloading, jobError }] = useMutation(
    CREATE_NEW_ROUND
  );

  useEffect(() => {
    const role = "";
    supabase.auth.getSession().then((res) => {
      if (res?.data?.session?.user) {
        // console.log(" HR ", res?.data?.session?.user.id);
        // setJobId(res?.data?.session?.user?.id)
      }
      else navigate("/login");
      let role = res?.data?.session?.user?.user_metadata?.role?.toLowerCase();
      console.log(role);
      if (role && role != "hr") navigate(`/${role}`);
    });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // let status="upcomming";
    // console.log(round, isFinal, roundDetails, dateDeadline,jobId,"data");

    createNewRound({
      variables: {
        "object": {
          "roundNo": round,
          "isFinal": isFinal,
          "roundTime": dateDeadline,
          "roundDetail":roundDetails,
          "jobId": jobId,
          "status": "upcomming",
          "companyName": "GroundUp",
          "shortlistStudentList": {
            "list" : []
          }
        }
      }
    })
    alert("round created")
    navigate(`/hr/createdjobs/${jobId}/createRound`)
    // if (!(name && companyName && emailId && mobileNo && password))
    //   return alert("All fields required");

  };

  return (
    <div
    >
      <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
        <div className="text-center text-2xl font-bold">
          Create Round
        </div>
        <div className="mt-4 sm:w-full sm:max-w-2xl m-auto">
          <div className="bg-white py-4 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6 w-full"
            onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Round No
                </label>
                <div className="mt-1">
                  <input
                    id="round"
                    type="number"
                    placeholder="Round No."
                    value={round}
                    onChange={(e) => setRound(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Is Final
                  </label>
                  <div className="mt-1">
                    <select
                      value={isFinal}
                      onChange={(e) => {
                        setIsFinal(e.target.value);
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                </div>

              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Round Details
                </label>
                <div className="mt-1 w-full">
                  <input
                    id="round-details"
                    type="text"
                    placeholder="Details"
                    value={roundDetails}
                    onChange={(e) => setRoundDetails(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Round Time
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
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRound;
