import { gql } from '@apollo/client';

export const GET_GREETINGS = gql`
    query getGreetings {
        greetings(orderBy: timestamp, orderDirection: desc, first: 1) {
            id,
            message,
            timestamp,
            owner
        }
    }
`;
