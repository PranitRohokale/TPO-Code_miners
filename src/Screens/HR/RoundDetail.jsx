import React from "react";
import { useParams } from "react-router";

const RoundDetails = () => {
  const { jobId, roundId } = useParams();

  return <>Round id {roundId}</>;
};

export default RoundDetails;
