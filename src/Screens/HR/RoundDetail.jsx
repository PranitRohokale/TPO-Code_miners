import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { GET_ALL_STUDENTS } from "../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_DETAILS_OF_ONE_ROUND_QUERY,
  GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY,
  GET_STUDENTS_DETAILS_FRO_EACH_ROUND_QUERY,
} from "../../Graphql/Queries/recruiter";
import {
  STUDENT_TRANSITION_FOR_NEXT_ROUND,
  MARK_FINAL_REJECT_STUDENTS_MUTATION,
  MARK_FINAL_SELECT_STUDENTS_MUTATION
} from "../../Graphql/Mutations/recruter";

const RoundDetails = () => {
  const { jobId, roundId } = useParams();
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);
  const [roundInfo, setRoundInfo] = useState({});
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [shortlistedStudents, setShortlistedStudents] = useState([]);

  useEffect(() => {
    setShortlistedStudents([]);
  }, []);

  const { error: eError } = useQuery(GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY, {
    onCompleted: (data) => {
      setRounds(data.Rounds);
    },
    variables: {
      applicationId: jobId,
    },
  });

  const { loading: roundInfoLoading, error: roundInfoError } = useQuery(
    GET_ALL_DETAILS_OF_ONE_ROUND_QUERY,
    {
      onCompleted: (data) => {
        setRoundInfo(data.Rounds_by_pk);
        let currentRoundNumber = 0;
        rounds?.forEach((row, index) => {
          if (row?.id == roundId) currentRoundNumber = index;
        });

        if (currentRoundNumber + 1 < rounds.length) {
          setShortlistedStudents(
            rounds[currentRoundNumber + 1]?.shortlistStudentList?.list
          );
        }
      },
      variables: {
        roundId: roundId,
      },
    }
  );

  const { loading: studentsInfoLoading, error: studentsInfoError } = useQuery(
    GET_STUDENTS_DETAILS_FRO_EACH_ROUND_QUERY,
    {
      onCompleted: (data) => setStudentsInfo(data.Applications),
      variables: {
        jobId,
        applicationIds: roundInfo?.shortlistStudentList?.list ?? [],
      },
    }
  );

  const [studentTransition, { data }] = useMutation(
    STUDENT_TRANSITION_FOR_NEXT_ROUND
  );

  const [selectFinalStudents, { data: finalStudentsData }] = useMutation(
    MARK_FINAL_SELECT_STUDENTS_MUTATION
  );
  const [rejectFinalStudents, { data: finalStudentsDataRejects }] = useMutation(
    MARK_FINAL_REJECT_STUDENTS_MUTATION
  );

  //helper fucntions
  const checkHandler = (id) => {
    setShortlistedStudents(
      shortlistedStudents.includes(id)
        ? shortlistedStudents.filter((item) => item != id)
        : [...shortlistedStudents, id]
    );
    // console.log(shortlistedStudents, " heyyyy");
  };
  const handleShortlist = () => {
    // console.log(shortlistedStudents, " heyyyy");
    let currentRoundNumber = 0;
    rounds?.forEach((row, index) => {
      if (row?.id == roundId) currentRoundNumber = index;
    });
    // console.log(rounds);
    if (!(currentRoundNumber + 1 < rounds.length)) {
      return alert("Create Next Round First & then only shortlist");
    }
    const nextRoundId = rounds[currentRoundNumber + 1]?.id;
    const variables = {
      roundId: nextRoundId,
      _set: {
        shortlistStudentList: {
          list: shortlistedStudents,
        },
      },
    };

    studentTransition({ variables });
    alert(`${shortlistedStudents?.length} students forwarded to next round...`);
    setShortlistedStudents([]);
    navigate(`/hr/createdjobs/${jobId}/${nextRoundId}`);
  };

  const finalSelects = () => {
    rejectFinalStudents({
      variables: {
        jobId
      },
    });

    selectFinalStudents({
      variables: {
        applicationsIds: shortlistedStudents,
        roundId
      },
    });

    if (finalStudentsData?.update_Applications_many?.affected_rows || true) {
      alert(`${shortlistedStudents?.length} students marked as Selected!!!`);
    }
  };

  if (roundInfoLoading)
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
        Round No : {roundInfo?.roundNo ?? "-"}
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
                      Send Mail
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
                  {studentsInfo.length == 0 ? (
                    <h6 class="font-medium leading-tight text-base text-center mt-0 mb-2 text-cyan-300">
                      No Record Found
                    </h6>
                  ) : (
                    <>
                      {studentsInfo.map((row, index) => {
                        const {
                          id: applicationId,
                          resumeLink,
                          selectionStatus,
                          Student,
                        } = row;
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
                          programme,
                          gradYear,
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
                                  class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                  type="checkbox"
                                  checked={shortlistedStudents.includes(
                                    applicationId
                                  )}
                                  onChange={() => checkHandler(applicationId)}
                                  id="flexCheckDefault"
                                />
                                {(selectionStatus===1) && (
                                  <span class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded-full">
                                    Selected
                                  </span>
                                )}
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
                          : roundInfo?.isFinal
                          ? "inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                          : "inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                      }`}
                      onClick={() => {
                        if (roundInfo?.isFinal) finalSelects();
                        else handleShortlist();
                      }}
                    >
                      {roundInfo?.isFinal
                        ? "Final Selects"
                        : "ShortList for next round"}
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

export default RoundDetails;
