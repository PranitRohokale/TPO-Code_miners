import { gql } from '@apollo/client';

const CREATE_NEW_ADMIN_MUTATION = gql`
mutation createNewTpo($objects: [TPO_Heads_insert_input!]!) {
    insert_TPO_Heads(objects: $objects) {
      affected_rows
      returning {
        id
        firstName
        clgEmail
      }
    }
  }
`;

const GET_ADMIN_INFO_QUERY = gql`
  query getAdminInfo($id: uuid = "") {
    TPO_Heads_by_pk(id: $id) {
      firstName
      middleName
      lastName
      id
      gender
      dob
      clgEmail
      inserted_at
    }
  }
`;

const UPDATE_STUDENT_FOR_CR_MUTATION = gql`
mutation updateStudent($id: uuid = "", $isCr: Boolean = false) {
  update_Students_by_pk(pk_columns: {id: $id}, _set: {isCr: $isCr}) {
    id
    isCr
  }
}
`;

export {
    CREATE_NEW_ADMIN_MUTATION,
    GET_ADMIN_INFO_QUERY,
    UPDATE_STUDENT_FOR_CR_MUTATION
}