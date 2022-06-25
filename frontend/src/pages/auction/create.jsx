import React, {useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { DatePicker } from 'antd';
import {parseEther} from 'ethers/lib/utils';
import "antd/dist/antd.css";
import useAuctionContract from '../../hooks/useAuctionContract';
import Button from '../../components/Button/Button';
import TransactionStateScreen from '../../components/Transaction/TransactionStateScreen';

export default function CreateAuction () {
  const {RangePicker} = DatePicker;
  const [txHash, setHash] = useState('');
  const [isCompleteTx, setIsCompleteTx] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [startEndTime, setRange] = useState();
  const [minBid, setMinBid] = useState(0);
  const instance = useAuctionContract();


  const createAuction = async () => {
    if(!startEndTime?.length) return;
    setLoading(true);

    const params = {
      startTime: startEndTime[0].unix(),
      endTime: startEndTime[1].unix(),
      minBid: parseEther(minBid.toString()),
      minHigherBid: Math.floor(5 * 100),
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
      <div className="w-screen h-screen bg-sandMedium flex items-center justify-center">
        <Navbar/>
        {txHash ? (
            <TransactionStateScreen isComplete={isCompleteTx} txHash={txHash}/>
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
                <Button isLoading={isLoading} isDisabled={!startEndTime?.length} onClick={createAuction}>
                  Create Auction
                </Button>
              </div>
            </div>
        )}
      </div>
  )
}