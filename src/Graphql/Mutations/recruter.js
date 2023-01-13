import { gql } from '@apollo/client';

const CREATE_NEW_RECRUTERS_MUTATION = gql`
  mutation createNewRecruters($objects: [Recruiters_insert_input!] = []) {
    insert_Recruiters(objects: $objects) {
      affected_rows
      returning {
        id
        name
        email
      }
    }
  }
`;


export {
    CREATE_NEW_RECRUTERS_MUTATION
}