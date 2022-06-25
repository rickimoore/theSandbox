import React from "react";
import Head from 'next/head'
import Layout from "../templates/Layout";
import Navbar from "../components/Navbar/Navbar";
import useLatestAuctionQuery from '../hooks/subgraph/useLatestAuctionQuery';
import AuctionCard from '../components/AuctionCard/AuctionCard';


export default function SandBox() {
  const {data} = useLatestAuctionQuery();

    return (
        <Layout>
            <Head>
                <title>Mavrik's Sandbox</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar/>
            <div className="h-screen w-screen bg-sand flex flex-col lg:flex-row">
              <div className="h-full flex-1 pt-8 flex flex-col justify-end">
                <div className="w-full h-95 flex items-center pl-8 border-t-2 border-sandMedium">
                  <h1 className="text-5xl font-bold">Something about Building <br/> Castles In The Sand</h1>
                </div>
              </div>
              <div className="h-full bg-sandMedium w-576 flex items-center justify-center pt-8">
                {data && (
                    <AuctionCard auction={data}/>
                )}
              </div>
            </div>
        </Layout>
    )
}