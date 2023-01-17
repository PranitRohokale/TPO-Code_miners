import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_STUDENTS } from "../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import {
  GET_APPLICANT_LIST_BY_JOB_ID_QUERY,
  GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY,
} from "../../Graphql/Queries/recruiter";
import { STUDENT_TRANSITION_FOR_NEXT_ROUND } from "../../Graphql/Mutations/recruter";

const ApplicantList = () => {
  const { jobId, roundId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [shortlistedStudents, setShortlistedStudents] = useState([]);

  const { loading, error } = useQuery(GET_APPLICANT_LIST_BY_JOB_ID_QUERY, {
    onCompleted: (data) => {
      setApplications(data.Applications);
    },
    variables: {
      jobId: jobId,
    },
  });

  const { error: eError } = useQuery(GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY, {
    onCompleted: (data) => setRounds(data.Rounds),
    variables: {
      applicationId: jobId,
    },
  });

  const [studentTransition, { data: d, error: sError }] = useMutation(
    STUDENT_TRANSITION_FOR_NEXT_ROUND
  );

  const checkHandler = (id) => {
    setShortlistedStudents(
      shortlistedStudents.includes(id)
        ? shortlistedStudents.filter((item) => item != id)
        : [...shortlistedStudents, id]
    );
    // console.log(shortlistedStudents, " heyyyy");
  };

  const handleShortlist = () => {
    if (shortlistedStudents?.length === 0) return;
    else if (rounds?.length === 0) {
      alert("Create Round First");
      return;
    }

    const variables = {
      roundId: rounds?.[0]?.id,
      _set: {
        shortlistStudentList: {
          list: shortlistedStudents,
        },
      },
    };

    studentTransition({
      variables,
    });

    alert(`${shortlistedStudents.length} students shortlisted for next round`);
    navigate(`/hr/createdjobs/${jobId}/${rounds[0]?.id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          .
        </div>
      </div>
    );
  return (
    <>
      <h3 className="font-medium leading-tight text-center text-3xl mt-0 mb-2 text-white">
        Applicant List
      </h3>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b border-b bg-yellow-100 border-yellow-200 ">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      Sr.No
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      is ShortList
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      Branch
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      CPI
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      Resume Link
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 p-4 text-left"
                    >
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length == 0 ? (
                    <h6 class="font-medium leading-tight text-base text-center mt-0 mb-2 text-cyan-300">
                      No Record Found
                    </h6>
                  ) : (
                    <>
                      {applications.map((row, index) => {
                        const { id: applicationId, resumeLink, Student } = row;
                        const {
                          id: studentId,
                          CPI,
                          branch,
                          clgEmail,
                          gender,
                          firstName,
                          lastName,
                          mobileNumber,
                          clgId,
                        } = Student;

                        const fullName =
                          (firstName?.length ? firstName : " ") +
                          (lastName?.length ? lastName : "");

                        return (
                          <tr key={index} className="bg-white border-b ">
                            <td className="p-4  whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              <div class="form-check">
                                <input
                                  class="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                  type="checkbox"
                                  checked={shortlistedStudents.includes(
                                    applicationId
                                  )}
                                  onChange={() => checkHandler(applicationId)}
                                  id="flexCheckDefault"
                                />
                              </div>
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              {clgId}
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              {fullName?.length ? fullName : "NA"}
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              {branch?.length ? branch : "NA"}
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              {CPI}
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              <a
                                href={
                                  clgEmail?.length ? `mailto:${clgEmail}` : "#"
                                }
                                class="text-blue-600 visited:text-purple-600 ..."
                              >
                                send mail
                              </a>
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              <a
                                href={resumeLink?.length ? resumeLink : "#"}
                                class="text-blue-600 visited:text-purple-600 ..."
                                target={"_blank"}
                              >
                                Resume
                              </a>
                            </td>
                            <td className="text-sm text-gray-900 font-light p-4 whitespace-nowrap">
                              {gender ? gender : "NA"}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
              {shortlistedStudents?.length ? (
                <div class="space-x-2 m-3 inset-x-px">
                  <div>
                    <button
                      type="button"
                      disabled={shortlistedStudents?.length === 0}
                      className={`${
                        shortlistedStudents?.length === 0
                          ? "inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out cursor-not-allowed"
                          : "inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                      }`}
                      onClick={handleShortlist}
                    >
                      ShortList Students
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantList;
