import { gql } from "@apollo/client";

const GET_ALL_USERS_QUERY = gql`
  query getAllUsers {
    auth_users {
      id
      role
      raw_user_meta_data
    }
  }
`;

export {
    GET_ALL_USERS_QUERY
}