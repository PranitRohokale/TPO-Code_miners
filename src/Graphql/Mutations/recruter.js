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

const CREATE_NEW_JOB_MUTATION = gql`
  mutation createNewJob($newJob: Job_Details_insert_input! = {}) {
    insert_Job_Details_one(object: $newJob) {
      id
      title
      Job_Requirements {
        id
      }
    }
  }
`;

const CREATE_NEW_ROUND = gql`
mutation createNewRound($object: Rounds_insert_input!) {
  insert_Rounds_one(object: $object) {
    id
    roundNo
    jobId
    roundTime
    shortlistStudentList
  }
}`

const STUDENT_TRANSITION_FOR_NEXT_ROUND = gql`
mutation studentTransitionForNextRound($roundId: bigint = "", $_set: Rounds_set_input = {}) {
  update_Rounds_by_pk(pk_columns: {id: $roundId}, _set: $_set) {
    id
    isFinal
    jobId
    roundDetail
    roundNo
    roundTime
    shortlistStudentList
  }
}`

export {
    CREATE_NEW_RECRUTERS_MUTATION,
    CREATE_NEW_JOB_MUTATION,
    CREATE_NEW_ROUND,
    STUDENT_TRANSITION_FOR_NEXT_ROUND
}