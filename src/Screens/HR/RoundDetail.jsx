import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { GET_ALL_STUDENTS } from "../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery ,useMutation} from "@apollo/client";
import ApplicantListTable from "./PastJobs/ApplicantListTable/ApplicantListTable";
import { GET_ALL_DETAILS_OF_ONE_ROUND_QUERY } from "../../Graphql/Queries/recruiter";
import { GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY } from "../../Graphql/Queries/recruiter";
import { STUDENT_TRANSITION_FOR_NEXT_ROUND } from "../../Graphql/Mutations/recruter";

const RoundDetails = () => {
  const { jobId, roundId } = useParams();
  
  const [rounds, setRounds] = useState([]);
  const [roundInfo, setRoundInfo] = useState({});
  const { loading, error } = useQuery(GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY, {
    onCompleted: (data) => setRounds(data.Rounds),
  });
  const { loading1, error1 } = useQuery(GET_ALL_DETAILS_OF_ONE_ROUND_QUERY, {
    onCompleted: (data) => setRoundInfo(data.Rounds_by_pk),
    variables : {
      "roundId": roundId
    }
  });

  const [studentTransition,{data}] = useMutation(STUDENT_TRANSITION_FOR_NEXT_ROUND)

  console.log("Round info:",roundInfo);
  
  // const roundsData = [
  //   {
  //     id: 1,
  //     isFinal: false,
  //     roundDetail: "This is a coding round",
  //     roundNo: 1,
  //     roundTime: "2023-01-14T10:32:48",
  //     status: "upcomming",
  //   },
  //   {
  //     id: 2,
  //     isFinal: false,
  //     roundDetail: "Technical Interview",
  //     roundNo: 2,
  //     roundTime: "2023-01-16T10:41:33",
  //     status: "upcomming",
  //   },
  // ];

  const roundAttrs= Object.entries(roundInfo).map(([key, value]) => ({key,value}));


  // if(loading)
  //     return

  return (
    // <ApplicantListTable
    //   students={students}
    //   updatedCrs={updatedCrs}
    //   setUpdatedCrs={setUpdatedCrs}
    //   updateStudent={updateStudent}
    //   title={"Round " + roundId}
    //   roundAttrs={roundAttrs}
    // />
    <>
      <hr />
      <Button
        onClick={()=>{}}
        variant="contained"
        color="success"
        sx={{ marginTop: 3, marginLeft: 100 }}
      >
        Confirm Selection
      </Button>
    </>
  );
};

export default RoundDetails;
