import {useMemo} from 'react';
import {useAccount, useBalance} from 'wagmi';
import {parseEther} from 'ethers/lib/utils';

const useCheckWalletBalance = (bid) => {
  const { data } = useAccount();
  const balance = useBalance({
    addressOrName: data?.address,
  });

  return useMemo(() => {
    if(!balance || !bid) return false;
    return balance?.data?.value.gt(parseEther(bid.toString()));
  }, [balance, bid]);
}

export default useCheckWalletBalance;