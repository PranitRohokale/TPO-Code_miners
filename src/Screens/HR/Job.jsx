import React, { useState } from "react";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/hrSidebar/Sidebar";
import {
  GET_JOB_INFO_BY_JOBID_QUERY,
  GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY,
} from "../../Graphql/Queries/recruiter";
import { useQuery } from "@apollo/client";
import styles from "./CreateJob/CreateJob.module.css";

const Job = () => {
  const { jobId } = useParams();
  const [rounds, setRounds] = useState([]);

  const { loading, error, data } = useQuery(GET_JOB_INFO_BY_JOBID_QUERY, {
    variables: { id: jobId },
  });

  const { error: eError } = useQuery(GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY, {
    onCompleted: (data) => setRounds(data.Rounds),
    variables: {
      applicationId: jobId,
    },
  });

  if (loading)
    return (
      <div role="status" class="grid h-screen place-items-center">
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );

  return (
    <div className={styles.hospitals_wrapper}>
      <Sidebar value="Create Job" />
      <div className={styles.main_wrapper}>
        <div class="container bg-white my-12 rounded-lg py-3 px-6 mx-auto">
          <section class="mb-2 p-3 text-gray-800 text-center md:text-left">
            <div class="block rounded-lg shadow-lg bg-white">
              <div class="flex bg-white rounded-lg flex-wrap items-center">
                <div class="grow-0 shrink-0 basis-auto w-full md:w-12/12">
                  <div class="px-2 py-4 md:px-12">
                    <h2 class="text-3xl font-bold mb-6">
                      <span class="text-red-600">
                        {data?.Job_Details_by_pk?.title}
                      </span>
                    </h2>
                    <p class="text-gray-500 text-lg mb-6 pb-2 ">
                      {data?.Job_Details_by_pk?.description}
                    </p>
                    <p class="text-gray-500 text-lg mb-6 pb-2 ">
                      Salary : {data?.Job_Details_by_pk?.salary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="m-2 p-3 my-5 text-gray-800 text-center md:text-left">
            <div class="flex space-x-5  space-around">
              <Link to={`/hr/createdjobs/${jobId}/applicantList`}>
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Applicant List
                </button>
              </Link>

              {rounds &&
                rounds.map(({ id, roundNo }, index) => {
                  return (
                    <Link key={index} to={`/hr/createdjobs/${jobId}/${id}`}>
                      <button
                        type="button"
                        class="inline-block px-6 py-2.5 bg-purple-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Round : {roundNo}
                      </button>
                    </Link>
                  );
                })}

              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
              >
                Total Rounds : {rounds?.length ? rounds?.length : 0}
              </button>

              {rounds?.[rounds.length - 1]?.isFinal ? (
                ""
              ) : (
                <Link to={`/hr/createdjobs/${jobId}/createRound`}>
                  <button
                    type="button"
                    class="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Create New Round
                  </button>
                </Link>
              )}

              {/* </div> */}
            </div>
          </section>
          <section class="mb-2 p-3 text-gray-800 text-center md:text-left">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Job;
