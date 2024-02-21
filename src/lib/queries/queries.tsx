import { gql } from "@apollo/client";

const GET_COUNTRY_BY_ISO = gql`
  query GetCountryByISO($isoCode: String!) {
    countries(filter: { code: { eq: $isoCode } }) {
      name
      capital
      code
      currency
      emoji
      languages {
        code
        name
      }
    }
  }
`;

export default GET_COUNTRY_BY_ISO;
