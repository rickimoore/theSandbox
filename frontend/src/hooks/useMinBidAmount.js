import {useMemo} from 'react';
import getAmountPlusPercentage from '../utils/getAmountPlusPercentage';
import formatEth from '../utils/formatEth';

const useMinBidAmount = (auction) => {
  const minBidAmount = useMemo(() => {
    if(!auction) return;

    const { minBid, minHigherBid, highestBid } = auction;

    const formattedMinBid = formatEth(minBid);

    if(highestBid) {
      const formattedHighestBid = formatEth(highestBid);
      return getAmountPlusPercentage(formattedHighestBid, minHigherBid / 100);
    }

    return getAmountPlusPercentage(formattedMinBid, minHigherBid / 100);
  }, [auction]);


  return {
    minBidAmount
  }
}

export default useMinBidAmount;