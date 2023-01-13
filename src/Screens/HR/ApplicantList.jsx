import React from "react";
import { useParams } from "react-router";

const ApplicantList = () => {
  const { jobId } = useParams();

  return <>Applicant List</>;
};

export default ApplicantList;
