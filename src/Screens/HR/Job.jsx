import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/hrSidebar/Sidebar";
import {
  GET_JOB_INFO_BY_JOBID_QUERY,
  GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY,
} from "../../Graphql/Queries/recruiter";
import { useQuery } from "@apollo/client";
import styles from "./CreateJob/CreateJob.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoundsDetails } from "../../actions/interviewRoundActions";
import Loader from "../../Components/Loader";

const Job = () => {
  const { jobId } = useParams();
  // const [rounds, setRounds] = useState([]);
  const dispatch = useDispatch();

  const interviewRounds = useSelector((state) => state.interviewRounds);
  const {
    rounds,
    loading: interviewRoundsLoading,
    error: interviewRoundsError,
  } = interviewRounds;

  const { loading, error, data } = useQuery(GET_JOB_INFO_BY_JOBID_QUERY, {
    variables: { id: jobId },
  });

  // const { error: eError } = useQuery(GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY, {
  //   onCompleted: (data) => setRounds(data.Rounds),
  //   variables: {
  //     applicationId: jobId,
  //   },
  // });

  useEffect(() => {
    dispatch(getAllRoundsDetails(jobId));
  }, [dispatch, jobId]);

  if (error) return <p>error</p>;

  if (loading) return <Loader />;

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
          {interviewRoundsLoading ? (
            <Loader color="success" />
          ) : (
            <section class="m-2 p-3 my-5 text-gray-800 text-center md:text-left">
              <div class="flex space-x-5  flex-wrap space-around">
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
                          class="inline-block m-1 px-6 py-2.5 bg-purple-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out"
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
          )}
          <section class="mb-2 p-3 text-gray-800 text-center md:text-left">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Job;
