import React from 'react';
import {AUCTION_PERIOD} from '../../../../constants';
import formatEth from '../../../utils/formatEth';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Auction} from '../../../proptypes/auction';
import {getAuctionCardUrl} from '../../../helpers/Auction.helpers';

const ClosedAuction = ({auction}) => {
  const {isRedeemable} = auction;
  const url = getAuctionCardUrl(AUCTION_PERIOD.OVER, auction);


  return (
      <div className="w-full">
        <div className="w-full flex py-6 justify-between">
          <div>
            <p className="text-xs text-secondaryGrey font-medium">Winning Bid</p>
            <p className="text-sm">
              {`${formatEth(auction.highestBid || 0)} ETH`}
            </p>
          </div>
          <p className="text-xs text-secondaryGrey font-medium">Auction Ended</p>
        </div>
        <Link href={url} passHref>
          <a>
            <button className="w-full cursor-pointer p-6 bg-midnight hover:bg-midnightMedium text-white">
              {isRedeemable ? 'Redeem Block' : 'View Auction'}
            </button>
          </a>
        </Link>
      </div>
  )
}

ClosedAuction.propTypes = {
  auction: PropTypes.shape(Auction),
}

export default ClosedAuction;