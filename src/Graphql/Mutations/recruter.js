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

// {
//     "objects": [
//       {
//         "id": "53ec5de4-e19f-4a02-988c-d10805680eab",
//         "name": "pranit",
//         "email": "pranitrohokale@gmail.com",
//         "companyName": "GroundUp",
//         "mobileNo": "+918446122060"
//       }
//     ]
//   }


export {
    CREATE_NEW_RECRUTERS_MUTATION
}