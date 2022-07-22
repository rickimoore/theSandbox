import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {parseEther} from 'ethers/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuctionContract from '../hooks/useAuctionContract';
import getAmountPlusPercentage from '../utils/getAmountPlusPercentage';
import useValidBeneficiary from '../hooks/useValidBeneficiary';
import {newAuctionValidation} from '../validations/newAuctionValidation';
import useCalculatedGasFees from '../hooks/useCalculatedGasFees';
import { notification } from 'antd';
import {notifyTransactionError} from '../helpers/Transaction.helpers';

const CreateAuctionForm = ({children}) => {
  const instance = useAuctionContract();
  const isBeneficiary = useValidBeneficiary();
  const [txHash, setHash] = useState('');
  const [isCompleteTx, setIsCompleteTx] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { calculateGasFee } = useCalculatedGasFees();

  const {
    control,
      watch,
      getValues,
      formState: {isValid}
  } = useForm({
    defaultValues: {
      startEndTime: null,
      minHigherBid: 0,
      minBid: 0,
    },
    mode: 'onChange',
    resolver: yupResolver(newAuctionValidation)
  });

  const minBid = watch('minBid');
  const minHigherBid = watch('minHigherBid');

  const outBidAmount = useMemo(() => {
    return getAmountPlusPercentage(minBid, minHigherBid);
  }, [minBid, minHigherBid]);

  const onSubmit = async () => {
    const { startEndTime } = getValues();

    setLoading(true);

    const gasFees = await calculateGasFee();

    const params = {
      startTime: startEndTime[0].unix(),
      endTime: startEndTime[1].unix(),
      minBid: parseEther(minBid.toString()),
      minHigherBid: Math.floor(minHigherBid * 100),
    };

    const tx = await instance?.startBlockAuction(params, gasFees).catch(e => {
      setLoading(false);
      notifyTransactionError(e.code);
    });

    if(!tx) return;

    setLoading(false);
    setHash(tx.hash);

    const res = await tx.wait();

    if(!res) return;

    setIsCompleteTx(true);
    notification.success({
      message: "Transaction Completed!",
      description: "You can view your auction now.",
      placement: "bottomRight"
    });
  }

  return (
      <form>
        {
          children && children({
            control,
            outBidAmount,
            txHash,
            isCompleteTx,
            isLoading,
            isDisabled: !isBeneficiary || !isValid,
            onSubmit
          })
        }
      </form>
  )
}

CreateAuctionForm.propTypes = {
  children: PropTypes.func.isRequired,
}

export default CreateAuctionForm;