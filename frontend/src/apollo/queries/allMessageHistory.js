import { gql } from '@apollo/client';

export const GET_ALL_MESSAGE_HISTORY = gql`
    query getHistory($first: Int!, $skip: Int!) {
        greetings(orderBy: timestamp, orderDirection: desc, skip: $skip, first: $first) {
            id,
            message,
            timestamp,
            owner
        }
    }
`