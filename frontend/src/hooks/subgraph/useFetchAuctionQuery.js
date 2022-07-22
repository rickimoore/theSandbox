import {useQuery} from 'react-apollo-hooks';
import {GET_AUCTION} from '../../apollo/queries/getAuction';
import numberToHex from '../../utils/numberToHex';

const useFetchAuctionQuery = (auctionId) => {
  const { data, error } = useQuery(
      GET_AUCTION,
      {
        skip: !auctionId,
        suspend: true,
        variables: {id: numberToHex(auctionId)},
      },
  );

  return {
    data: data?.blockAuction,
    error
  }
}

export default useFetchAuctionQuery;