import padStartZeros from '../../utils/padStartZeros';
import {hexToNumber} from '../../utils/hexToNumber';
import React from 'react';
import PropTypes from 'prop-types';
import {Auction} from '../../proptypes/auction';
import {getPeriodTime} from '../../utils/getTimePeriod';
import {AUCTION_PERIOD, BENEFICIARY_ACCOUNT} from '../../../constants';
import Button from '../Button/Button';
import {useWeb3React} from '@web3-react/core';
import {getAuctionCardUrl} from '../../helpers/Auction.helpers';

const AuctionListItem = ({auction}) => {
  const { account } = useWeb3React();
  const {id, startTime, endTime, isRedeemable, isClaimed} = auction;
  const auctionPeriod = getPeriodTime(startTime, endTime);

  const url = getAuctionCardUrl(auctionPeriod, auction);

  const isClaimable = account === BENEFICIARY_ACCOUNT && !isClaimed;
  const isLive = auctionPeriod === AUCTION_PERIOD.LIVE;
  const isOver = auctionPeriod === AUCTION_PERIOD.OVER;

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