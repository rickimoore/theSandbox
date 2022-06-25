import {useWeb3React} from "@web3-react/core";
import {CHAIN_PARAMS, DEFAULT_CHAIN_ID} from "../../constants";
import {useState} from "react";

const useChainConnection = () => {
  const [isLoading, setLoading] = useState(false);
  const { active, chainId, library, account } = useWeb3React();

  const switchNetwork = async () => {
    const params = CHAIN_PARAMS[Number(DEFAULT_CHAIN_ID)];
    setLoading(true);

    try {
      const provider = library ? library.provider : window.ethereum;

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: params?.chainId}, account]
      });

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return {
    active,
    isLoading,
    switchNetwork,
    isValidChain: chainId?.toString() === DEFAULT_CHAIN_ID,
  }
}

export default useChainConnection;