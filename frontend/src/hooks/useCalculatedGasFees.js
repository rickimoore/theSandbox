import { BigNumber } from 'ethers';
import {MAX_GAS_WEI} from '../../constants';
import {useProvider} from 'wagmi';
import {useCallback} from 'react';

const useCalculatedGasFees = (maxWei = MAX_GAS_WEI) => {
  const provider = useProvider();

  const calculateGasFee = useCallback(async () => {
    const feeData = await provider?.getFeeData();

    if(!feeData) return;

    const maxPriorityFeePerGas = BigNumber.from(
        Math.max(maxWei, Number(feeData.maxPriorityFeePerGas)),
    );
    const maxFeePerGas = maxPriorityFeePerGas.add(
        BigNumber.from(feeData.maxFeePerGas).sub(
            BigNumber.from(feeData.maxPriorityFeePerGas),
        ),
    );

    return {
      maxPriorityFeePerGas,
      maxFeePerGas,
    };
  }, [provider, maxWei]);

  return { calculateGasFee };
};

export default useCalculatedGasFees;
