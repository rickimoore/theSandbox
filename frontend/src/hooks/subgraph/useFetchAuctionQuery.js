import {useQuery} from '@apollo/client';
import {GET_AUCTION} from '../../apollo/queries/getAuction';
import {useEffect, useState} from 'react';
import numberToHex from '../../utils/numberToHex';

const useFetchAuctionQuery = (auctionId) => {
  const [auction, setAuction] = useState();
  const { error, refetch } = useQuery(
      GET_AUCTION,
      {
        skip: true
      }
  );

  useEffect(() => {
    if(auctionId) {
      // eslint-disable-next-line no-unused-expressions
      refetch({ id: numberToHex(auctionId) })?.then((response) => {
        setAuction(response?.data.blockAuction);
      });
    }
  }, [auctionId]);


  return {
    data: auction,
    error
  }
}

export default useFetchAuctionQuery;