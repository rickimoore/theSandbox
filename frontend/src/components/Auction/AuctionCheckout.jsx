import padStartZeros from '../../utils/padStartZeros';
import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Auction} from '../../proptypes/auction';
import {useWeb3React} from '@web3-react/core';
import useAuctionContract from '../../hooks/useAuctionContract';
import formatEth from '../../utils/formatEth';
import {hexToNumber} from '../../utils/hexToNumber';
import {getPeriodTime} from '../../utils/getTimePeriod';
import isMatchingAddress from '../../utils/isMatchingAddress';
import {formatUnits, parseEther} from 'ethers/lib/utils';
import {AUCTION_PERIOD} from '../../../constants';
import {useRouter} from 'next/router';
import Button from '../Button/Button';
import TransactionStateScreen from '../Transaction/TransactionStateScreen';

const AuctionCheckout = ({auction}) => {
  const {
    push
  } = useRouter();
  const { id, startTime, endTime, highestBid, minBid, highestBidder } = auction;
  const { account, library } = useWeb3React();
  const instance = useAuctionContract();

  const [isLoading, setLoading] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [txHash, setHash] = useState('');

  const [bid, setBid] = useState(0);
  const [estimatedGasFee, setGasFee] = useState(0);
  const [insufficientBalance, setBalanceStatus] = useState(false);

  const topBid = formatEth(highestBid || minBid || 0);

  const auctionId = hexToNumber(id);
  const auctionPeriod = getPeriodTime(startTime, endTime);
  const hasTopBid = isMatchingAddress(highestBidder, account);
  const isBidTooLow = bid <= topBid;

  const validateBidBalance = useCallback(async () => {
    if(account && bid > 0) {
      const balance = await library.getBalance(account);
      const formattedBalance = parseFloat(formatUnits(balance.toString(), 18));

      return  formattedBalance <= bid;
    }
  }, [account, bid]);

  useEffect(() => {
    if(auctionId && auctionPeriod !== AUCTION_PERIOD.LIVE) {
      (async () => await push(`/auction/${auctionId}`))()
    }
  }, [auctionPeriod, auctionId]);

  useEffect(() => {
    (async () => {
      const isSufficient = await validateBidBalance();
      setBalanceStatus(isSufficient);
    })();
  }, [bid]);

  useEffect(() => {
    if(!auctionId || bid <= 0 || !bid || insufficientBalance) {
      setGasFee(0);
      return;
    };

    (async () => {
      const wei = parseEther(bid.toString());
      const gasPrice = await library?.getGasPrice();

      const fee = await instance?.estimateGas.bidBlockAuction(auctionId, { from: account, value: wei.toString()}).catch(e => {
        console.log(e, 'error')
      });

      if(!fee) return;

      setGasFee(parseFloat(formatUnits(fee.toString(), 18)) * parseFloat(gasPrice));
    })();
  }, [bid, auctionId, account, insufficientBalance, library]);

  const bidAuction = async () => {
    if(bid <= 0 || !bid) return;

    setLoading(true);

    const wei = parseEther(bid.toString());

    const tx = await instance?.bidBlockAuction(auctionId, { from: account, value: wei.toString()}).catch((e) => {
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
        <div className="w-576 bg-sand">
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
                  <p className="text-xs font-bold">Minimum Bid: {topBid} ETH</p>
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
                    (hasTopBid || isBidTooLow || insufficientBalance) && (
                        <div className="border-sandDark border-2 p-4">
                          {hasTopBid ? 'You already have the top bid!' : insufficientBalance ? 'Insufficient balance' : 'Bid is too low!'}
                        </div>
                    )
                  }
                  <Button onClick={bidAuction} isLoading={isLoading}
                          isDisabled={insufficientBalance || bid === 0 || isBidTooLow}>
                    Place Bid
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