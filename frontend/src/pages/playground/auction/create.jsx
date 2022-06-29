import React, {useState} from 'react';
import useAuctionContract from '../../../hooks/useAuctionContract';
import Button from '../../../components/Button/Button';
import {formatEther} from 'ethers/lib/utils';
import timestampToIso from '../../../utils/timestampToIso';
import {parseEther} from 'ethers/lib/utils';
import "antd/dist/antd.css";
import { DatePicker } from 'antd';
import {useAccount} from 'wagmi';

export default function CreateAuction () {
  const { data } = useAccount();
  const instance = useAuctionContract();
  const [startEndTime, setRange] = useState();
  const [minBid, setMinBid] = useState(0);
  const [amount, setAmount] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const {RangePicker} = DatePicker;

  const viewAuction = async () => {
    const tx = await instance?.viewAuction().catch((e) => {
      console.log(e)
    });

    if(!tx) return;

    console.log(timestampToIso(tx[0]), timestampToIso(tx[1]), formatEther(tx[2]), formatEther(tx[3]))
  }

  const createAuction = async () => {
    if(!startEndTime?.length) return;

    const params = {
      startTime: startEndTime[0].unix(),
      endTime: startEndTime[1].unix(),
      minBid: parseEther(minBid.toFixed(2)),
      minHigherBid: Math.floor(5 * 100),
    };

    const tx = await instance?.startBlockAuction(params).catch((e) => {
      console.log(e)
    });

    if(!tx) return;

    console.log(tx);
  }

  const bidAuction = async () => {
    if(amount <= 0 || !data?.address) return;

    const wei = parseEther(amount.toString());

    const tx = await instance?.bidBlockAuction(1, { from: data.address, value: wei.toString()}).catch((e) => {
      console.log(e)
    });

    if(!tx) return;

    console.log(tx);
  }

  const claimAuction = async () => {
    const tx = await instance?.claimAuction(4).catch((e) => {
      console.log(e)
    });

    if(!tx) return;

    console.log(tx);
  }

  const redeemBlock = async () => {
    if(redeemAmount <= 0 || !data?.address) return;

    const wei = parseEther(redeemAmount.toString());

    const tx = await instance?.redeemBlock(1, { from: data?.address, value: wei.toString()}).catch((e) => {
      console.log(e)
    });

    if(!tx) return;

    console.log(tx);
  }

  return (
      <div className="h-screen w-screen flex items-center justify-center space-x-8">
        <div className="space-y-8">
          <div>
            <RangePicker
                onChange={setRange}
                format="YYYY-MM-DD HH:mm"
                showTime={{ format: 'HH:mm' }}
            />
          </div>
          <div>
            <input onChange={e => setMinBid(+e.target.value)} className="border p-2 rounded" type="number"/>
          </div>
          <Button onClick={createAuction}>Create Auction</Button>
          <Button onClick={viewAuction}>View Auction</Button>
          <div>
            <Button onClick={claimAuction}>Claim Auction</Button>
          </div>
          <div>
            <input onChange={e => setRedeemAmount(+e.target.value)} className="border p-2 rounded" type="number"/>
            <Button onClick={redeemBlock}>Reedeem Block</Button>
          </div>
        </div>
        <div>
          <input className="border p-2 rounded" onChange={e => setAmount(+e.target.value)} min={0} type="number"/>
          <Button onClick={bidAuction}>Bid</Button>
        </div>
      </div>
  )
}