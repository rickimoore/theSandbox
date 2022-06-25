import React from 'react';
import {useRouter} from 'next/router';
import useFetchAuctionQuery from '../../../hooks/subgraph/useFetchAuctionQuery';
import {getPeriodTime} from '../../../utils/getTimePeriod';
import {AUCTION_PERIOD} from '../../../../constants';
import {Statistic} from 'antd';
import {hexToNumber} from '../../../utils/hexToNumber';
import padStartZeros from '../../../utils/padStartZeros';
import LiveAuction from '../../../components/Auction/LiveAuction';
import Navbar from '../../../components/Navbar/Navbar';
import AuctionActions from '../../../components/Auction/AuctionActions';

export default function AuctionPage () {
  const { Countdown } = Statistic;
  const {
    query: { id },
  } = useRouter();

  const { data, error } = useFetchAuctionQuery(id);

  const auctionId = data && hexToNumber(data.id);
  const auctionPeriod = data && getPeriodTime(data.startTime, data.endTime);
  const auctionOver = auctionPeriod === AUCTION_PERIOD.OVER;
  const auctionLive = auctionPeriod === AUCTION_PERIOD.LIVE;

  const timeRef = data && new Date(parseInt(auctionLive ? data.endTime : data.startTime) * 1000);

  console.log(data)

  const onFinish = () => {

  }

  return (
      <div className="bg-sandMedium">
        <Navbar/>
        {
          data ? (
              <>
                <div className="w-screen h-screen bg-sand flex items-center justify-center">
                  <div className="w-full max-w-xl h-576 bg-sandMedium">

                  </div>
                </div>
                <div className="pt-20 pb-40 flex justify-center">
                  <div className="w-full max-w-xl">
                    <div className="w-full space-y-12">
                      {data && (
                          <AuctionActions auction={data}/>
                      )}
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
          ) : (
              <div>
                loading...
              </div>
          )
        }
      </div>
  )
}
