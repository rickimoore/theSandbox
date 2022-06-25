import {gql} from '@apollo/client';

export const GET_LATEST_AUCTION = gql`
query getLatestAuction {
  blockAuctions(orderBy: createdAt, orderDirection: desc, first: 1) {
    id,
    isClaimed,
    isRedeemed,
    isRedeemable,
    minBid,
    startTime,
    endTime,
    highestBid,
    createdAt
  }
}
`