import {AUCTION_PERIOD} from '../../constants';
import {hexToNumber} from '../utils/hexToNumber';

export const getAuctionCardUrl = (period, auction) => {
  const { id } = auction;

  const auctionId = hexToNumber(id);

  if(auction.isRedeemable) {
    return `/auction/${auctionId}/redeem`
  }

  if(period === AUCTION_PERIOD.LIVE) {
    return `/auction/${auctionId}/checkout`;
  }

  return `/auction/${auctionId}`;

}