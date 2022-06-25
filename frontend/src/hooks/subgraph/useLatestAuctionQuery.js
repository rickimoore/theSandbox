import {useQuery} from '@apollo/client';
import {GET_LATEST_AUCTION} from '../../apollo/queries/getLatestAuction';

const useLatestAuctionQuery = () => {
  const { data } = useQuery(
      GET_LATEST_AUCTION,
  );

  return {
    data: data?.blockAuctions.length ? data.blockAuctions[0] : undefined,
  };
}

export default useLatestAuctionQuery;