import React from 'react';
import PropTypes from 'prop-types';
import {Auction} from '../../proptypes/auction';
import {getPeriodTime} from '../../utils/getTimePeriod';
import {AUCTION_PERIOD} from '../../../constants';
import Link from 'next/link';
import {hexToNumber} from '../../utils/hexToNumber';
import ClosedAuction from './Views/ClosedAuction';
import ComingAuction from './Views/ComingAuction';
import LiveAuction from './Views/LiveAuction';

const AuctionCard = ({auction}) => {
  const {endTime, startTime} = auction;
  const auctionPeriod = getPeriodTime(startTime, endTime);

  const auctionLive = auctionPeriod === AUCTION_PERIOD.LIVE;
  const auctionEnded = auctionPeriod === AUCTION_PERIOD.OVER;


  const renderContent = () => {
    switch (true) {
      case auctionLive:
        return <LiveAuction auction={auction}/>
      case auctionEnded:
        return <ClosedAuction auction={auction}/>
      default:
        return <ComingAuction auction={auction}/>
    }
  }

  return (
      <div className="w-full p-4 border border-sandDark bg-sand max-w-md">
        <Link passHref href={`/auction/${hexToNumber(auction.id)}`}>
          <a>
            <div className="w-full bg-sandMedium h-96"/>
          </a>
        </Link>
        {renderContent()}
      </div>
  )
}

AuctionCard.propTypes = {
  auction: PropTypes.shape(Auction).isRequired,
}

export default AuctionCard;