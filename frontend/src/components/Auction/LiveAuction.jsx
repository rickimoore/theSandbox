import React from 'react';
import PropTypes from 'prop-types';
import useFetchBidsQuery from '../../hooks/subgraph/useFetchBidsQuery';
import numberToHex from '../../utils/numberToHex';
import formatAddress from '../../utils/formatAddress';
import formatEth from '../../utils/formatEth';
import timestampToIso from '../../utils/timestampToIso';
import InfiniteScroll from "react-infinite-scroller";
import moment from 'moment';
import {CHAIN_PARAMS, DEFAULT_CHAIN_ID} from '../../../constants';

const LiveAuction = ({auctionId}) => {
  const { bids, loadMore, isLoading, hasMore } = useFetchBidsQuery(numberToHex(auctionId));

  return bids.length ? (
      <InfiniteScroll threshold={5} useWindow={false} initialLoad={false} loadMore={loadMore} hasMore={!isLoading && hasMore}>
        <div className="w-full max-h-80 overflow-scroll">
          {
            bids.map((bid) => (
                <div key={bid.txHashCreated} className="w-full px-2 py-6 flex items-center justify-between">
                  <div>
                    <p><span className="font-bold mr-2">@{formatAddress(bid.from.id)}</span>{`bid ${formatEth(bid.amount)} ETH`}</p>
                    <p className="text-xs">{moment(timestampToIso(bid.timestamp)).format('MMMM D YYYY, H:mm')}</p>
                  </div>
                  <a rel="noopener noreferrer" target="_blank" href={`${CHAIN_PARAMS[DEFAULT_CHAIN_ID].blockExplorerUrls[0]}/tx/${bid.txHashCreated}`}>
                    <i className="bi bi-box-arrow-up-right"/>
                  </a>
                </div>
            ))
          }
        </div>
      </InfiniteScroll>
  ) : null;
}

LiveAuction.propTypes = {
  auctionId: PropTypes.number.isRequired,
}

export default LiveAuction;