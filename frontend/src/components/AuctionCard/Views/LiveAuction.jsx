import React from 'react';
import {AUCTION_PERIOD} from '../../../../constants';
import formatEth from '../../../utils/formatEth';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Auction} from '../../../proptypes/auction';
import {Statistic} from 'antd';
import {getAuctionCardUrl} from '../../../helpers/Auction.helpers';

const LiveAuction = ({auction}) => {
  const { highestBid, minBid } = auction;
  const { Countdown } = Statistic;
  const {endTime} = auction;

  const timeRef = new Date(parseInt(endTime) * 1000);
  const url = getAuctionCardUrl(AUCTION_PERIOD.LIVE, auction);

  const onFinish = () => {}

  return (
      <div className="w-full">
        <div className="w-full flex py-6 justify-between">
          <div>
            <p className="text-xs text-secondaryGrey font-medium">
              {highestBid ? 'Current Bid' : 'Minimum Bid'}
            </p>
            <p className="text-sm">
              {`${formatEth(highestBid || minBid || 0)} ETH`}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondaryGrey font-medium">Time Remaining</p>
            <Countdown value={timeRef} onFinish={onFinish} />
          </div>
        </div>
        <Link href={url} passHref>
          <a>
            <button className="w-full cursor-pointer p-6 bg-midnight hover:bg-midnightMedium text-white">
              Make Bid
            </button>
          </a>
        </Link>
      </div>
  )
}

LiveAuction.propTypes = {
  auction: PropTypes.shape(Auction),
}

export default LiveAuction;