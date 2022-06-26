import React from 'react';
import {useRouter} from 'next/router';
import useFetchAuctionQuery from '../../../hooks/subgraph/useFetchAuctionQuery';
import Navbar from '../../../components/Navbar/Navbar';
import AuctionCheckout from '../../../components/Auction/AuctionCheckout';

export default function Checkout () {
  const {
    query: { id },
  } = useRouter();

  const { data } = useFetchAuctionQuery(id);

  return (
      <div className="w-screen h-screen bg-sandMedium flex">
        <Navbar/>
        {data ? (
            <AuctionCheckout auction={data}/>
        ) : (
            <div>Loading...</div>
        )}
      </div>
  )
}