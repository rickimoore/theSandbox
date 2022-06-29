import padStartZeros from '../../utils/padStartZeros';
import {hexToNumber} from '../../utils/hexToNumber';
import React from 'react';
import PropTypes from 'prop-types';
import {Auction} from '../../proptypes/auction';
import {getPeriodTime} from '../../utils/getTimePeriod';
import {AUCTION_PERIOD} from '../../../constants';
import Button from '../Button/Button';
import {getAuctionCardUrl} from '../../helpers/Auction.helpers';
import useValidBeneficiary from '../../hooks/useValidBeneficiary';

const AuctionListItem = ({auction}) => {
  const isBeneficiary = useValidBeneficiary();
  const {id, startTime, endTime, isRedeemable, isClaimed} = auction;
  const auctionPeriod = getPeriodTime(startTime, endTime);

  const url = getAuctionCardUrl(auctionPeriod, auction);

  const isLive = auctionPeriod === AUCTION_PERIOD.LIVE;
  const isOver = auctionPeriod === AUCTION_PERIOD.OVER;
  const isClaimable = isBeneficiary && !isClaimed && isOver;

  const renderText = () => {
    switch (true) {
      case isClaimable:
        return 'Claim';
      case isRedeemable:
        return 'Redeem';
      case isLive:
        return 'Bid';
      default:
        return 'View';
    }
  }

  return (
      <div className="w-full p-4 mb-4 border border-sandDark flex justify-between">
        <div>
          <h2>Auction #{padStartZeros(hexToNumber(id), 3)}</h2>
          <p>Status: {isLive ? 'Live' : isOver ? 'Over' : 'Coming'}</p>
        </div>
        <div>
          <Button href={url}>{renderText()}</Button>
        </div>
      </div>
  )
}

AuctionListItem.propTypes = {
  auction: PropTypes.shape(Auction).isRequired,
}

export default AuctionListItem;