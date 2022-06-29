import {useMemo} from 'react';
import getAmountPlusPercentage from '../utils/getAmountPlusPercentage';
import formatEth from '../utils/formatEth';

const useMinBidAmount = (auction) => {
  const minBidAmount = useMemo(() => {
    if(!auction) return;

    const { minBid, minHigherBid, highestBid } = auction;

    if(highestBid) {
      const formattedHighestBid = formatEth(highestBid);
      return getAmountPlusPercentage(formattedHighestBid, minHigherBid / 100);
    }

    return formatEth(minBid);
  }, [auction]);


  return {
    minBidAmount
  }
}

export default useMinBidAmount;