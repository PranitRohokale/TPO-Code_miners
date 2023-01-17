import { gql } from "@apollo/client";

const GET_RECRUITER_INFO = gql`
query getRecruterInfo($_eq: uuid = "") {
    Recruiters(where: {id: {_eq: $_eq}}) {
      id
      email
      mobileNo
      companyName
      name
      created_at

    }
  }
`;


const GET_JOB_CREATED_BY_RECRUTER_QUERY = gql`
  query getJobCreatedByRecruter($_eq: uuid = "") {
  Job_Details(where: {recruterId: {_eq: $_eq}}, order_by: {updated_at: desc}) {
    id
    locations
    noOfRounds
    salary
    title
    description
    companyName
    recruterId
  }
}
`;

const GET_APPLICANT_LIST_BY_JOB_ID_QUERY = gql`
  query getApplicantListByJobId($jobId: bigint = "") {
    Applications(where: {jobId: {_eq: $jobId}}, order_by: {insertted_at: desc}) {
      id
      isAccepted
      isSelected
      resumeLink
      Student {
        id
        CPI
        branch
        clgEmail
        gender
        clgId
        firstName
        middleName
        lastName
        mobileNumber
        column_12th
        gradYear
        resumeLink
        programme
        personalEmail
      }
    }
  }
`;

const GET_ALL_DETAILS_OF_ONE_ROUND_QUERY = gql`
query getAllDetailsOfOneRound($roundId: bigint = "") {
  Rounds_by_pk(id: $roundId) {
    id
    jobId
    companyName
    isFinal
    roundDetail
    roundNo
    roundTime
    status
    shortlistStudentList
  }
}
`;
const GET_JOB_INFO_BY_JOBID_QUERY = gql`
query getJobInfoByJobId($id: bigint = "") {
  Job_Details_by_pk(id: $id) {
    companyName
    description
    endDateToApply
    id
    locations
    recruterId
    noOfRounds
    salary
    title
  }
}
`;

const GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY = gql`
  query getRoundsInfoByApplicationid($applicationId: bigint = "") {
    Rounds(where: {jobId: {_eq: $applicationId}}, order_by: {inserted_at: asc}) {
      id
      isFinal
      roundDetail
      roundNo
      roundTime
      status
      shortlistStudentList
    }
  }
`;


const GET_STUDENTS_DETAILS_FRO_EACH_ROUND_QUERY = gql`
  query getStudentsDetailsFroEachRound($jobId: bigint = "", $applicationIds: [bigint!] = []) {
    Applications(where: {jobId: {_eq: $jobId}, id: {_in: $applicationIds}}) {
      id
      resumeLink
      isSelected
      Student {
        CPI
        branch
        clgEmail
        clgId
        firstName
        gradYear
        gender
        id
        isCr
        isDreamPlaced
        isNormalPlaced
        isSuperPlaced
        lastName
        middleName
        mobileNumber
        programme
        resumeLink
        personalEmail
      }
    }
  }
`;

export {
    GET_RECRUITER_INFO,
    GET_JOB_CREATED_BY_RECRUTER_QUERY,
    GET_ALL_DETAILS_OF_ONE_ROUND_QUERY,
    GET_APPLICANT_LIST_BY_JOB_ID_QUERY,
    GET_JOB_INFO_BY_JOBID_QUERY,
    GET_ROUNDS_INFO_BY_APPLICATIONID_QUERY,
    GET_STUDENTS_DETAILS_FRO_EACH_ROUND_QUERY
}