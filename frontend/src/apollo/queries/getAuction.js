import {gql} from '@apollo/client';

export const GET_AUCTION = gql`
  query getLatestAuction($id: String!) {
    blockAuction(id: $id) {
      id,
      startTime,
      endTime,
      highestBid,
      minHigherBid,
      minBid,
      highestBidder,
      isClaimed,
      isRedeemed,
      isRedeemable,
    }
  }
`