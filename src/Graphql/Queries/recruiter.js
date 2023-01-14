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
        firstName
        middleName
        lastName
        mobileNumber
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

export {
    GET_RECRUITER_INFO,
    GET_JOB_CREATED_BY_RECRUTER_QUERY,
    GET_ALL_DETAILS_OF_ONE_ROUND_QUERY,
    GET_APPLICANT_LIST_BY_JOB_ID_QUERY
}