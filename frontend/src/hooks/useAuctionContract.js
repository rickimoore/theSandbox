import useContract from "./useContract";
import Contracts from '../contracts/contract-address.json';
import BlockAuctionAbi from '../contracts/BlockAuction.json';

const useAuctionContract = () => {
  const env = process.env.NEXT_PUBLIC_NETWORK;
  const contract = Contracts[env].BlockAuction.address;
  return useContract(contract.toLocaleString(), BlockAuctionAbi.abi);
}

export default useAuctionContract;