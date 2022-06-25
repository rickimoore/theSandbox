import {useCallback, useEffect, useState} from "react";
import useGreeterContract from "./useGreeterContract";
import {formatUnits} from "ethers/lib/utils";
import {useWeb3React} from "@web3-react/core";
import {debounce} from "../utils/debounce";
import {fetchMaticPrice} from "../services/moralis";

const useGreetingGasEstimation = (message) => {
    const [gasFee, setGasFee] = useState();
    const [usdAmount, setUsdAmount] = useState();
    const instance = useGreeterContract();
    const { library } = useWeb3React();

    const calculateFee = useCallback(debounce(async (message) => {
        const gasPrice = await library?.getGasPrice();
        const tx = await instance?.estimateGas.setGreeter(message);

        if(!tx) return;
        const amount = parseFloat(formatUnits(tx.toString(), 18)) * parseFloat(gasPrice);
        setGasFee(amount);

        try {
            const {data} = await fetchMaticPrice(amount);
            setUsdAmount(data.price);
        } catch (e) {
            console.log(e);
        }
    }, 600), []);

  useEffect(() => {
      if(!message) {
          setGasFee(undefined);
          setUsdAmount(undefined);
          return;
      };

      calculateFee(message);
  }, [message]);

  return {
      gasFee,
      usdAmount
  }
}

export default useGreetingGasEstimation;