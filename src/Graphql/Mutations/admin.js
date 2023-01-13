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

// {
//     "objects": [
//       {
//         "id": "",
//         "firstName": "Pranit",
//         "lastName": "Rohokale",
//         "middleName": "Rangnath",
//         "gender": "male",
//         "clgEmail": "prrohokale_b19@ce.vjti.ac.in"
//       }
//     ]
//   }

export {
    CREATE_NEW_ADMIN_MUTATION
}