import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import {Suspense} from 'react';
import AuctionDetails from '../../../views/AuctionDetails/AuctionDetails';
import {useRouter} from 'next/router';

export default function AuctionPage () {
  const {
    query: { id },
  } = useRouter();

  return id ? (
      <div className="bg-sandMedium">
        <Navbar/>
        <Suspense fallback={
          <div className="h-screen w-screen flex items-center justify-center bg-sand">Loading...</div>
        }>
          <AuctionDetails id={id}/>
        </Suspense>
      </div>
  ) : null;
}
