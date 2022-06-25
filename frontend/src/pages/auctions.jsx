import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import useFetchAllAuctionsQuery from '../hooks/subgraph/useFetchAllAuctionsQuery';
import AuctionListItem from '../components/AuctionList/AuctionListItem';
import InfiniteScroll from "react-infinite-scroller";

export default function Auctions () {
  const { auctions, loadMore, hasMore, loading } = useFetchAllAuctionsQuery();

  return (
      <div className="w-screen min-h-screen bg-sandMedium flex justify-center">
        <Navbar/>
        <div className="w-full max-w-xl pt-24">
          <div className="border-b-2 border-sandDark py-2">
            <h1>Auction History</h1>
          </div>
          <div className="w-full pt-8 pb-16">
            <InfiniteScroll initialLoad={false} loadMore={loadMore} hasMore={!loading && hasMore}>
              {
                auctions.map(auction => (
                    <AuctionListItem key={auction.id} auction={auction}/>
                ))
              }
            </InfiniteScroll>
          </div>
        </div>
      </div>
  )
}