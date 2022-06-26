import {useCallback, useEffect, useState} from 'react';
import {formatUnits} from 'ethers/lib/utils';
import {useWeb3React} from '@web3-react/core';

const useCheckWalletBalance = (bid) => {
  const { account, library } = useWeb3React();
  const [insufficientBalance, setBalanceStatus] = useState(false);

  const validateBidBalance = useCallback(async () => {
    if(account && bid > 0) {
      const balance = await library.getBalance(account);
      const formattedBalance = parseFloat(formatUnits(balance.toString(), 18));

      return  formattedBalance <= bid;
    }
  }, [account, library, bid]);

  useEffect(() => {
    if(!bid) return;

    (async () => {
      const isSufficient = await validateBidBalance();
      setBalanceStatus(isSufficient);
    })();
  }, [bid]);

  return {
    insufficientBalance
  }
}

export default useCheckWalletBalance;