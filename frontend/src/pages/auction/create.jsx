import React, {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { DatePicker } from 'antd';
import {parseEther} from 'ethers/lib/utils';
import "antd/dist/antd.css";
import useAuctionContract from '../../hooks/useAuctionContract';
import Button from '../../components/Button/Button';
import TransactionStateScreen from '../../components/Transaction/TransactionStateScreen';
import getAmountPlusPercentage from '../../utils/getAmountPlusPercentage';
import useValidBeneficiary from '../../hooks/useValidBeneficiary';

export default function CreateAuction () {
  const {RangePicker} = DatePicker;
  const [txHash, setHash] = useState('');
  const [isCompleteTx, setIsCompleteTx] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [startEndTime, setRange] = useState();
  const [minHigherBid, setMinHigherBid] = useState(0);
  const [minBid, setMinBid] = useState(0);
  const instance = useAuctionContract();
  const isBeneficiary = useValidBeneficiary();

  const createAuction = async () => {
    if(!startEndTime?.length) return;
    setLoading(true);

    const params = {
      startTime: startEndTime[0].unix(),
      endTime: startEndTime[1].unix(),
      minBid: parseEther(minBid.toString()),
      minHigherBid: Math.floor(minHigherBid * 100),
    };

    const tx = await instance?.startBlockAuction(params).catch((e) => {
      console.log(e)
    });

    if(!tx) return;

    setLoading(false);
    setHash(tx.hash);

    const res = await tx.wait();

    if(!res) return;

    setIsCompleteTx(true);
  }


  return (
      <div className="w-screen h-screen bg-sandMedium flex flex-col items-center justify-center">
        <Navbar/>
        {!isBeneficiary && (
            <div className="mb-6 max-w-md">
              <h2>Opps...</h2>
              <p>It looks like you're not authorized to create an auction. You may not submit the form, however you can see what parameters are used to create an auction.</p>
            </div>
        )}
        {txHash ? (
            <TransactionStateScreen isComplete={isCompleteTx} txHash={txHash} redirectCta="View Auctions" redirectDestination="/auctions"/>
        ) : (
            <div className="max-w-xl w-full bg-white p-4 rounded">
              <h2>Create a new auction</h2>
              <div className="space-y-6">
                <div className="relative">
                  <p>Start - End Dates</p>
                  <RangePicker
                      onChange={setRange}
                      format="YYYY-MM-DD HH:mm"
                      showTime={{ format: 'HH:mm' }}
                  />
                </div>
                <div>
                  <p>Minimum Bid Amount</p>
                  <div className="flex space-x-4 items-center">
                    <input onChange={e => setMinBid(+e.target.value)} className="border p-2 rounded" type="number"/>
                    <p className="m-0">ETH</p>
                  </div>
                </div>
                <div>
                  <p>Minimum Higher Bid Percentage</p>
                  <div className="flex space-x-4 items-center">
                    <input min={0} onChange={e => setMinHigherBid(+e.target.value)} className="border p-2 rounded" type="number"/>
                    <p className="m-0">% (${getAmountPlusPercentage(minBid, minHigherBid)} ETH)</p>
                  </div>
                </div>
                <Button isLoading={isLoading} isDisabled={!startEndTime?.length || !isBeneficiary} onClick={createAuction}>
                  Create Auction
                </Button>
              </div>
            </div>
        )}
      </div>
  )
}