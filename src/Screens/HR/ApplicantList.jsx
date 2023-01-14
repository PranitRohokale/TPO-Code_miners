import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { GET_ALL_STUDENTS } from "../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery } from "@apollo/client";
import ApplicantListTable from "./PastJobs/ApplicantListTable/ApplicantListTable";
import { GET_APPLICANT_LIST_BY_JOB_ID_QUERY } from "../../Graphql/Queries/recruiter";

const ApplicantList = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const { loading, error } = useQuery(GET_APPLICANT_LIST_BY_JOB_ID_QUERY, {
    onCompleted: (data) => setApplications(data.Applications),
    variables : {
      "jobId": jobId
    }
  });
  const updateApplication = (id, applicationAttributes) => {
    var index = applications.findIndex((x) => x.id === id);
    if (index === -1) {
      // handle error
      console.log("error: index= -1");
    } else {
      // console.log("New student attr:", studentAttributes);
      var newApplications = [
        ...applications.slice(0, index),
        Object.assign({}, applications[index], applicationAttributes),
        ...applications.slice(index + 1),
      ];
      // console.log("New students:", newStudents);
      setApplications(newApplications);
    }
  };
  const [updatedSelects, setUpdatedSelects] = useState({});
  // if(loading)
  //     return

  return (
    <ApplicantListTable
      applications={applications}
      updatedSelects={updatedSelects}
      setUpdatedSelects={setUpdatedSelects}
      updateApplication={updateApplication}
      title="Applicants List"
      roundAttrs={[]}
    />
  );
};

export default ApplicantList;
