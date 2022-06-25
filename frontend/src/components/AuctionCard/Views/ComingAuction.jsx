import React from 'react';
import {AUCTION_PERIOD} from '../../../../constants';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Auction} from '../../../proptypes/auction';
import {Statistic} from 'antd';
import {getAuctionCardUrl} from '../../../helpers/Auction.helpers';
import formatEth from '../../../utils/formatEth';

const ComingAuction = ({auction}) => {
  const { Countdown } = Statistic;
  const {startTime, minBid} = auction;

  const timeRef = new Date(parseInt(startTime) * 1000);
  const url = getAuctionCardUrl(AUCTION_PERIOD.COMING, auction);

  const onFinish = () => {}

  return (
      <div className="w-full">
        <div className="w-full flex py-6 justify-between">
          <div>
            <p className="text-xs text-secondaryGrey font-medium">Minimum Bid</p>
            <p className="text-sm">
              {`${formatEth(minBid || 0)} ETH`}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondaryGrey font-medium">Auction Starts</p>
            <Countdown value={timeRef} onFinish={onFinish} />
          </div>
        </div>
        <Link href={url} passHref>
          <a>
            <button className="w-full cursor-pointer p-6 bg-midnight hover:bg-midnightMedium text-white">
              View Auction
            </button>
          </a>
        </Link>
      </div>
  )
}

ComingAuction.propTypes = {
  auction: PropTypes.shape(Auction),
}

export default ComingAuction;