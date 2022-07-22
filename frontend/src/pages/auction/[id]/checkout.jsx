import React from 'react';
import {useRouter} from 'next/router';
import Navbar from '../../../components/Navbar/Navbar';
import AuctionCheckout from '../../../components/Auction/AuctionCheckout';
import {Suspense} from 'react';

export default function Checkout () {
  const {
    query: { id },
  } = useRouter();

  return id ? (
      <div className="w-screen h-screen bg-sandMedium flex">
        <Navbar/>
        <Suspense fallback={<div>Loading...</div>}>
          <AuctionCheckout id={id}/>
        </Suspense>
      </div>
  ) : null;
}