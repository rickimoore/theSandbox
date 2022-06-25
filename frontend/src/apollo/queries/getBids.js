import {gql} from '@apollo/client';

export const GET_AUCTION_BIDS = gql`
query getActionBids($id: String!, $first: Int!, $skip: Int!) {
  bids(where: {auction: $id}, orderBy: timestamp, orderDirection: desc, skip: $skip, first: $first) {
    amount,
    timestamp,
    txHashCreated,
    from {
      id
    } 
  }
}
`