import { gql } from '@apollo/client';

export const GET_PREVIOUS_GREETINGS = gql`
    query getPreviousGreetings {
        greetings(orderBy: timestamp, orderDirection: desc, skip: 1) {
            id,
            message,
            timestamp,
            owner
        }
    }
`;
