import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';

const maxWei = 30000000000;

const useCalculatedGasFees = () => {
  const { library } = useWeb3React();

  const calculateGasFee = async () => {
    const feeData = await library.getFeeData();
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
