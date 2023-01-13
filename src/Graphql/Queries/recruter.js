import gql from "graphql-tag"


const GET_RECRUTER_INFO = gql`
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
  
`

export {
    GET_RECRUTER_INFO
}
