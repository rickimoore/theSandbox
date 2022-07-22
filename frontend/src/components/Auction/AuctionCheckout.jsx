import padStartZeros from '../../utils/padStartZeros';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {hexToNumber} from '../../utils/hexToNumber';
import {getPeriodTime} from '../../utils/getTimePeriod';
import {AUCTION_PERIOD} from '../../../constants';
import {useRouter} from 'next/router';
import Button from '../Button/Button';
import TransactionStateScreen from '../Transaction/TransactionStateScreen';
import useFetchAuctionQuery from '../../hooks/subgraph/useFetchAuctionQuery';
import CheckoutAuctionForm from '../../forms/CheckoutAuctionForm';
import InputField from '../Input/InputField';
import {Controller} from 'react-hook-form';
import {useAccount} from 'wagmi';

const AuctionCheckout = ({id}) => {
  const {
    push
  } = useRouter();
  const {data: address} = useAccount();
  const { data } = useFetchAuctionQuery(id);
  const { startTime, endTime } = data;

  const auctionId = hexToNumber(data.id);
  const auctionPeriod = getPeriodTime(startTime, endTime);

  useEffect(() => {
    if(auctionId && auctionPeriod !== AUCTION_PERIOD.LIVE) {
      (async () => await push(`/auction/${auctionId}`))()
    }
  }, [auctionPeriod, auctionId]);


  return (
      <>
        <div className="w-576 bg-sand flex items-center justify-center">
          hello image
        </div>
        <div className="flex-1 pt-24 flex justify-center">
          <CheckoutAuctionForm auction={data}>
            {({
                control, txHash, isCompleteTx, isLoading,
                onSubmit, isDisabled, hasTopBid, bid, isBidTooLow,
                hasBidBalance, estimatedGasFee, minBidAmount
            }) => txHash ? (
                <TransactionStateScreen
                  txHash={txHash} isComplete={isCompleteTx}
                  redirectCta="View Auction" redirectDestination={`/auction/${id}`} />
            ) : (
                <div className="w-full max-w-md space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-xl">Auction #{padStartZeros(auctionId, 3)}</h2>
                    <p>Place a bid to win a sand block. You will not be charged if you are outbid.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold">Minimum Bid: {minBidAmount} ETH</p>
                    <Controller
                        name="bid"
                        control={control}
                        render={({
                                   field: { ref: _ref, ...rest },
                                   fieldState: { error },
                                 }) => (
                            <InputField
                                step="0.1"
                                size="large"
                                autoFocus
                                disabled={hasTopBid}
                                type="number" error={error?.message}
                                min={0} addonAfter="ETH" {...rest} />
                        )}
                    />
                  </div>
                  <div>
                    <h3 className="mb-8">Bid Summary</h3>
                    <div className="w-full flex justify-between mb-2 p-2">
                      <p>Your Bid</p>
                      <p>{bid.toString()} ETH</p>
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
                    <Button onClick={onSubmit} isLoading={isLoading}
                            isDisabled={isDisabled}>
                      {address ? 'Place Bid' : 'Connect Wallet'}
                    </Button>
                  </div>
                </div>
            )}
          </CheckoutAuctionForm>
        </div>
      </>
  )
}

AuctionCheckout.propTypes = {
  id: PropTypes.string.isRequired,
}

export default AuctionCheckout;