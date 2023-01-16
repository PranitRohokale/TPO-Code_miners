import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { GET_ALL_STUDENTS } from "../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery , useMutation} from "@apollo/client";
import ApplicantListTable from "./PastJobs/ApplicantListTable/ApplicantListTable";
import { GET_APPLICANT_LIST_BY_JOB_ID_QUERY } from "../../Graphql/Queries/recruiter";
import { GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY } from "../../Graphql/Queries/recruiter";
import { STUDENT_TRANSITION_FOR_NEXT_ROUND } from "../../Graphql/Mutations/recruter";
import { useNavigate } from "react-router-dom";


const ApplicantList = () => {
  const { jobId, roundId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const { loading, error } = useQuery(GET_APPLICANT_LIST_BY_JOB_ID_QUERY, {
    onCompleted: (data) => setApplications(data.Applications),
    variables: {
      jobId: jobId,
    },
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

  const [rounds, setRounds] = useState([]);
  const { error : eError } = useQuery(GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY, {
    onCompleted: (data) => setRounds(data.Rounds),
    variables:{
      "applicationId": jobId
    }
  });
  const [studentTransition,{data : d, error: sError}] = useMutation(STUDENT_TRANSITION_FOR_NEXT_ROUND)

  const handleChange = ()=> {
    console.log("roundId: ",roundId);
    
    let applicationList = [];
    for (const [key, value] of Object.entries(updatedSelects)) {
      if (!value){
        applicationList.push(key);
      }
      console.log(`${key}: ${value}`);
    }
    // console.log({variables : {
    //   "roundId": rounds[0]?.id,
    //   "_set": {
    //     "shortlistStudentList": {
    //       "list": applicationList
    //     }
    //   }
    // }});
    if (!roundId && rounds?.length){
      studentTransition({
        variables : {
          "roundId": rounds[0]?.id,
          "_set": {
            "shortlistStudentList": {
              "list": applicationList
            }
          }
        }
      })
  
      navigate(`/hr/createdjobs/${jobId}/${rounds[0]?.id}`)
    }else if(rounds?.length){

    }

    console.log(rounds);
  }
  // if(loading)
  //     return

  return (
    <>
      <ApplicantListTable
        applications={applications}
        updatedSelects={updatedSelects}
        setUpdatedSelects={setUpdatedSelects}
        updateApplication={updateApplication}
        title="Applicants List"
        roundAttrs={[]}
      />

      <hr />
      <Button
        onClick={handleChange}
        variant="contained"
        color="success"
        sx={{ marginTop: 3, marginLeft: 100 }}
      >
        Confirm Selection
      </Button>
    </>
  );
};

export default ApplicantList;
