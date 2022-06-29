import padStartZeros from '../../utils/padStartZeros';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Auction} from '../../proptypes/auction';
import useAuctionContract from '../../hooks/useAuctionContract';
import {hexToNumber} from '../../utils/hexToNumber';
import {getPeriodTime} from '../../utils/getTimePeriod';
import isMatchingAddress from '../../utils/isMatchingAddress';
import {formatUnits, parseEther} from 'ethers/lib/utils';
import {AUCTION_PERIOD} from '../../../constants';
import {useRouter} from 'next/router';
import Button from '../Button/Button';
import TransactionStateScreen from '../Transaction/TransactionStateScreen';
import useMinBidAmount from '../../hooks/useMinBidAmount';
import useCheckWalletBalance from '../../hooks/useCheckWalletBalance';
import useCalculatedGasFees from '../../hooks/useCalculatedGasFees';
import {useAccount} from 'wagmi';

const AuctionCheckout = ({auction}) => {
  const {
    push
  } = useRouter();
  const { id, startTime, endTime, highestBidder } = auction;
  const { minBidAmount } = useMinBidAmount(auction);
  const { data } = useAccount();

  const instance = useAuctionContract();
  const { calculateGasFee } = useCalculatedGasFees();

  const [isLoading, setLoading] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [txHash, setHash] = useState('');

  const [bid, setBid] = useState(minBidAmount || 0);
  const [estimatedGasFee, setGasFee] = useState(0);
  const hasBidBalance = useCheckWalletBalance(bid);


  const auctionId = hexToNumber(id);
  const auctionPeriod = getPeriodTime(startTime, endTime);
  const hasTopBid = isMatchingAddress(highestBidder, data?.address);
  const isBidTooLow = bid < minBidAmount;
  const isInvalidBid = !data?.address || !auctionId || bid <= 0 || !bid || !hasBidBalance || isBidTooLow || hasTopBid;

  useEffect(() => {
    if(auctionId && auctionPeriod !== AUCTION_PERIOD.LIVE) {
      (async () => await push(`/auction/${auctionId}`))()
    }
  }, [auctionPeriod, auctionId]);

  useEffect(() => {
    if(isInvalidBid) {
      setGasFee(0);
      return;
    };

    (async () => {
      const wei = parseEther(bid.toString());
      const gasFees = await calculateGasFee();

      if(!gasFees) return;

      const fee = await instance?.estimateGas.bidBlockAuction(auctionId, { from: data?.address, value: wei.toString()}).catch(e => {
        console.log(e, 'error')
      });

      if(!fee) return;
      setGasFee(parseFloat(formatUnits(fee.toString(), 18)) * parseFloat(gasFees.maxPriorityFeePerGas.toString()));
    })();
  }, [bid, auctionId, isInvalidBid, data]);

  const bidAuction = async () => {
    if(bid <= 0 || !bid) return;

    setLoading(true);

    const wei = parseEther(bid.toString());
    const gasFees = await calculateGasFee();

    const tx = await instance?.bidBlockAuction(auctionId, { from: data.address, value: wei.toString(), ...gasFees}).catch((e) => {
      console.log(e)
      setLoading(false);
    });

    if(!tx) return;

    setLoading(false);
    setHash(tx.hash);

    const res = await tx.wait();

    if(!res) return;

    setComplete(true);
  }


  return (
      <>
        <div className="w-576 bg-sand flex items-center justify-center">
          hello image
        </div>
        <div className="flex-1 pt-24 flex justify-center">
          {txHash ? (
              <TransactionStateScreen txHash={txHash} isComplete={isComplete} redirectCta="View Auction" redirectDestination={`/auction/${auctionId}`} />
          ) : (
              <div className="w-full max-w-md space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl">Auction #{padStartZeros(auctionId, 3)}</h2>
                  <p>Place a bid to win a sand block. You will not be charged if you are outbid.</p>
                </div>
                <div className="space-y-2">
                  <input disabled={hasTopBid} placeholder=".01" value={bid} min={0}
                         onChange={e => setBid(e.target.value ? Number(e.target.value) : '')}
                         className="w-full p-2 border border-sandDark disabled:pointer-events-none disabled:opacity-50 outline-none bg-transparent" type="number"/>
                  <p className="text-xs font-bold">Minimum Bid: {minBidAmount} ETH</p>
                </div>
                <div>
                  <h3 className="mb-8">Bid Summary</h3>
                  <div className="w-full flex justify-between mb-2 p-2">
                    <p>Your Bid</p>
                    <p>{bid} ETH</p>
                  </div>
                  <div className="w-full flex justify-between bg-sandMedium50 p-2">
                    <p>Estimated Gas</p>
                    <p>~ {estimatedGasFee > 0 && `${estimatedGasFee.toFixed(6)} ETH`}</p>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {
                    bid > 0 && (hasTopBid || isBidTooLow || !hasBidBalance) && (
                        <div className="border-sandDark border-2 p-4">
                          {hasTopBid ? 'You already have the top bid!' : !hasBidBalance ? 'Insufficient balance' : 'Bid is too low!'}
                        </div>
                    )
                  }
                  <Button onClick={bidAuction} isLoading={isLoading}
                          isDisabled={isInvalidBid}>
                    {data?.address ? 'Place Bid' : 'Connect Wallet'}
                  </Button>
                </div>
              </div>
          )}
        </div>
      </>
  )
}

AuctionCheckout.propTypes = {
  auction: PropTypes.shape(Auction).isRequired,
}

export default AuctionCheckout;