import React from 'react';
import PropTypes from 'prop-types';
import {Auction} from '../../proptypes/auction';
import formatEth from '../../utils/formatEth';
import Link from 'next/link';
import {hexToNumber} from '../../utils/hexToNumber';
import {AUCTION_PERIOD, BENEFICIARY_ACCOUNT} from '../../../constants';
import {getPeriodTime} from '../../utils/getTimePeriod';
import {useWeb3React} from '@web3-react/core';
import ClaimAuction from '../ClaimAuction/ClaimAuction';
import formatAddress from '../../utils/formatAddress';
import useMinBidAmount from '../../hooks/useMinBidAmount';

const AuctionActions = ({auction}) => {
  const { account } = useWeb3React();
  const { id, startTime, endTime, highestBid, isClaimed, highestBidder } = auction;
  const { minBidAmount } = useMinBidAmount(auction);

  const auctionId = hexToNumber(id);
  const auctionPeriod = getPeriodTime(startTime, endTime);

  if(auctionPeriod === AUCTION_PERIOD.LIVE) {
    return (
        <div>
          <p className="mb-2 font-bold text-xs">Minimum Bid: {minBidAmount} ETH</p>
          <Link href={`/auction/${auctionId}/checkout`} passHref>
            <a>
              <button className="w-full cursor-pointer p-4 bg-midnight hover:bg-midnightMedium text-white">
                Place Bid
              </button>
            </a>
          </Link>
        </div>
    )
  }

  if(auctionPeriod === AUCTION_PERIOD.OVER) {
    if(account === BENEFICIARY_ACCOUNT && !isClaimed) {
      return (
          <ClaimAuction auctionId={id}/>
      )
    }

    if(auction.isRedeemable) {
      return (
          <Link href={`/auction/${auctionId}/redeem`} passHref>
            <a>
              <button className="w-full cursor-pointer p-6 bg-midnight hover:bg-midnightMedium text-white">
                Redeem Block
              </button>
            </a>
          </Link>
      )
    }

    if(highestBidder) {
      return (
          <div className="w-full border-sandDark border-2 p-4 flex items-center justify-between">
            <div>
              <p>Auction Winner</p>
              <p>{formatAddress(highestBidder)}</p>
            </div>

            <p>{formatEth(highestBid)} ETH</p>
          </div>
      )
    }
  }

  return null;
}

AuctionActions.propTypes = {
  auction: PropTypes.shape(Auction).isRequired,
}

export default AuctionActions;