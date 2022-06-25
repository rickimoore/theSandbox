import {gql} from '@apollo/client';

export const GET_ALL_AUCTIONS = gql`
  query getAllAuctions($first: Int!, $skip: Int!) {
    blockAuctions(orderBy: createdAt, orderDirection: desc, skip: $skip, first: $first) {
      id,
      startTime,
      endTime,
      highestBid,
      minBid,
      highestBidder,
      isClaimed,
      isRedeemed,
      isRedeemable,
      createdAt,
    }
  }
`