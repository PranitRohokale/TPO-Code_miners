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


export {
    GET_RECRUITER_INFO,
    GET_JOB_CREATED_BY_RECRUTER_QUERY
}