import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {formatEther, parseEther} from 'ethers/lib/utils';
import useCalculatedGasFees from '../hooks/useCalculatedGasFees';
import useAuctionContract from '../hooks/useAuctionContract';
import {useAccount} from 'wagmi';
import {Auction} from '../proptypes/auction';
import useMinBidAmount from '../hooks/useMinBidAmount';
import isMatchingAddress from '../utils/isMatchingAddress';
import useCheckWalletBalance from '../hooks/useCheckWalletBalance';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {notifyTransactionError} from '../helpers/Transaction.helpers';
import {notification} from 'antd';

const CheckoutAuctionForm = ({auction, children}) => {
  const { id, highestBidder } = auction;
  const { data } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [txHash, setHash] = useState('');
  const [isCompleteTx, setComplete] = useState(false);
  const { calculateGasFee } = useCalculatedGasFees();
  const instance = useAuctionContract();
  const { minBidAmount } = useMinBidAmount(auction);
  const [estimatedGasFee, setGasFee] = useState(0);

  const hasTopBid = isMatchingAddress(highestBidder, data?.address);

  const minBidValidation = minBidAmount || 0;

  const auctionCheckoutValidation = yup.object().shape({
    bid: yup
        .number()
        .min(minBidValidation, `must be at least ${minBidValidation} ETH`)
        .required().typeError('Must be a number')
  });


  const {
    control,
    watch,
    formState: {isValid}
  } = useForm({
    defaultValues: {
      bid: minBidAmount || 0,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(auctionCheckoutValidation),
  });

  const bid = watch('bid');
  const isBidTooLow = bid < minBidAmount;
  const hasBidBalance = useCheckWalletBalance(bid);
  const isInvalidBid = !data?.address || !hasBidBalance || isBidTooLow || hasTopBid;

  useEffect(() => {
    if(isInvalidBid) {
      setGasFee(0);
      return;
    };

    (async () => {
      const wei = parseEther(bid.toString());
      const gasFees = await calculateGasFee();

      if(!gasFees) return;

      const fee = await instance?.estimateGas.bidBlockAuction(id, { from: data?.address, value: wei.toString()}).catch(e => {
        console.log(e, 'error')
      });

      if(!fee) return;

      setGasFee(Number(formatEther(fee.mul(gasFees.maxPriorityFeePerGas).toString())));
    })();
  }, [bid, id, isInvalidBid, data]);

  const onSubmit = async () => {
    setLoading(true);

    const wei = parseEther(bid.toString());
    const gasFees = await calculateGasFee();

    const tx = await instance?.bidBlockAuction(id, { from: data.address, value: wei.toString(), ...gasFees}).catch(e => {
      setLoading(false);
      notifyTransactionError(e.code);
    });

    if(!tx) return;

    setLoading(false);
    setHash(tx.hash);

    const res = await tx.wait();

    if(!res) return;

    setComplete(true);

    notification.success({
      message: "Transaction Completed!",
      description: "Your bid has been placed in the auction.",
      placement: "bottomRight"
    });
  }

  return (
      <form>
        {
          children && children({
            control,
            txHash,
            isCompleteTx,
            isLoading,
            hasTopBid,
            bid,
            estimatedGasFee,
            minBidAmount,
            isBidTooLow,
            hasBidBalance,
            isDisabled: !isValid || isInvalidBid,
            onSubmit
          })
        }
      </form>
  )
}

CheckoutAuctionForm.propTypes = {
  auction: PropTypes.shape(Auction).isRequired,
  children: PropTypes.func.isRequired,
}

export default CheckoutAuctionForm;