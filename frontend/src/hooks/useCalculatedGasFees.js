import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import {MAX_GAS_WEI} from '../../constants';

const useCalculatedGasFees = (maxWei = MAX_GAS_WEI) => {
  const { library } = useWeb3React();

  const calculateGasFee = async () => {
    const feeData = await library?.getFeeData();

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
  };

  return { calculateGasFee };
};

export default useCalculatedGasFees;
