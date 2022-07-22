import AuctionActions from '../../components/Auction/AuctionActions';
import padStartZeros from '../../utils/padStartZeros';
import LiveAuction from '../../components/Auction/LiveAuction';
import React from 'react';
import {Statistic} from 'antd';
import useFetchAuctionQuery from '../../hooks/subgraph/useFetchAuctionQuery';
import {hexToNumber} from '../../utils/hexToNumber';
import {getPeriodTime} from '../../utils/getTimePeriod';
import {AUCTION_PERIOD} from '../../../constants';
import PropTypes from 'prop-types';

const AuctionDetails = ({id}) => {
  const { Countdown } = Statistic;

  const { data, error } = useFetchAuctionQuery(id);

  const auctionId = data && hexToNumber(data.id);
  const auctionPeriod = data && getPeriodTime(data.startTime, data.endTime);
  const auctionOver = auctionPeriod === AUCTION_PERIOD.OVER;
  const auctionLive = auctionPeriod === AUCTION_PERIOD.LIVE;

  const timeRef = data && new Date(parseInt(auctionLive ? data.endTime : data.startTime) * 1000);

  const onFinish = () => {

  }

  return (
      <>
        <div className="w-screen h-screen bg-sand flex items-center justify-center">
          <div className="w-full max-w-xl h-576 bg-sandMedium">

          </div>
        </div>
        <div className="pt-20 pb-40 flex justify-center">
          <div className="w-full max-w-xl">
            <div className="w-full space-y-12">
              <AuctionActions auction={data}/>
              <div className="w-full py-4 border-b-2 border-sandDark flex justify-between">
                <h2>Auction #{padStartZeros(auctionId, 3)}</h2>
                {
                  auctionOver ? (
                      <h2>Auction Over</h2>
                  ) : (
                      <div className="flex items-center space-x-2">
                        <h2>{auctionLive ? 'Time Remaining' : 'Auction Starts'}: </h2>
                        <Countdown value={timeRef} onFinish={onFinish} />
                      </div>
                  )
                }
              </div>
            </div>
            {
              auctionLive && (
                  <LiveAuction auctionId={auctionId}/>
              )
            }
            <div className="mt-8">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </>
  )
}

AuctionDetails.propTypes = {
  id: PropTypes.string.isRequired
}

export default AuctionDetails;