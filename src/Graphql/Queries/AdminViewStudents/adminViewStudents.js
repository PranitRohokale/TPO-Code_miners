import { gql } from "@apollo/client";

const GET_ALL_STUDENTS   = gql`
query getAllStudents($where: Students_bool_exp = {}) {
    Students(where: $where) {
      CPI
      SPI1
      SPI2
      SPI3
      SPI4
      SPI5
      SPI6
      SPI7
      SPI8
      age
      branch
      clgEmail
      clgId
      column_10th
      column_12th
      created_at
      dob
      firstName
      gender
      gradYear
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
    }
  }
  
`;

export {
    GET_ALL_STUDENTS    
}