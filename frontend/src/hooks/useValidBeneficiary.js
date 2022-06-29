import {useAccount} from 'wagmi';
import {useMemo} from 'react';
import {BENEFICIARY_ACCOUNT} from '../../constants';
import isMatchingAddress from '../utils/isMatchingAddress';

const useValidBeneficiary = () => {
  const { data } = useAccount();

  return useMemo(() => {
    return isMatchingAddress(data?.address, BENEFICIARY_ACCOUNT);
  }, [data]);

}

export default useValidBeneficiary;