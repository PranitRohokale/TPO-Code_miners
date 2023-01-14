import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_ALL_STUDENTS } from "../../Graphql/Queries/AdminViewStudents/adminViewStudents";
import { useQuery } from "@apollo/client";
import ApplicantListTable from "./PastJobs/ApplicantListTable/ApplicantListTable";
import { GET_ALL_DETAILS_OF_ONE_ROUND_QUERY } from "../../Graphql/Queries/recruiter";

const RoundDetails = () => {
  const { jobId, roundId } = useParams();
  const [students, setStudents] = useState([]);
  const [roundInfo, setRoundInfo] = useState({});
  const { loading, error } = useQuery(GET_ALL_STUDENTS, {
    onCompleted: (data) => setStudents(data.Students),
  });
  const { loading1, error1 } = useQuery(GET_ALL_DETAILS_OF_ONE_ROUND_QUERY, {
    onCompleted: (data) => setRoundInfo(data.Rounds_by_pk),
    variables : {
      "roundId": roundId
    }
  });
  console.log("Round info:",roundInfo);
  const updateStudent = (id, studentAttributes) => {
    var index = students.findIndex((x) => x.id === id);
    if (index === -1) {
      // handle error
      console.log("error: index= -1");
    } else {
      // console.log("New student attr:", studentAttributes);
      var newStudents = [
        ...students.slice(0, index),
        Object.assign({}, students[index], studentAttributes),
        ...students.slice(index + 1),
      ];
      // console.log("New students:", newStudents);
      setStudents(newStudents);
    }
  };
  const [updatedCrs, setUpdatedCrs] = useState({});
  const roundsData = [
    {
      id: 1,
      isFinal: false,
      roundDetail: "This is a coding round",
      roundNo: 1,
      roundTime: "2023-01-14T10:32:48",
      status: "upcomming",
    },
    {
      id: 2,
      isFinal: false,
      roundDetail: "Technical Interview",
      roundNo: 2,
      roundTime: "2023-01-16T10:41:33",
      status: "upcomming",
    },
  ];
  // const roundAttrs = [
  //   { "desc": "roundDetail", "value": "Technical Interview", "color_val": "#E8E8E8" },
  //   { "desc": "roundTime", "value": "2023-01-16T10:41:33", "color_val": "#E8E8E8" },
  //   {"desc": "status", "value": "upcomming", "color_val": "#E8E8E8"}
  // ];

  // const roundAttrs=[
  //   {
  //     "desc": 
  //   }
  // ]
   
  // var temp= Object.entries(roundInfo).map(([key, value]) => ({key,value}));
  // console.log("Round info:", temp);
  const roundAttrs= Object.entries(roundInfo).map(([key, value]) => ({key,value}));


  // if(loading)
  //     return

  return (
    <ApplicantListTable
      students={students}
      updatedCrs={updatedCrs}
      setUpdatedCrs={setUpdatedCrs}
      updateStudent={updateStudent}
      title={"Round " + roundId}
      roundAttrs={roundAttrs}
    />
  );
};

export default RoundDetails;
