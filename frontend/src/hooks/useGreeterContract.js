import useContract from "./useContract";
import Contracts from '../contracts/contract-address.json';
import GreeterAbi from '../contracts/Greeter.json';

const useGreeterContract = () => {
  const env = process.env.NEXT_PUBLIC_NETWORK;
  const contract = Contracts[env].Greeter.address;
  return useContract(contract, GreeterAbi.abi);
}

export default useGreeterContract;