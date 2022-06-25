import useContract from "./useContract";
import Contracts from '../contracts/contract-address.json';
import TokenContract from '../contracts/Token.json';

const useTokenContract = () => {
  return useContract(Contracts.Token, TokenContract.abi)
}

export default useTokenContract;