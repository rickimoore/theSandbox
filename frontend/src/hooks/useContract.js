import {ethers} from "ethers";
import {useWeb3React} from "@web3-react/core";
import {useMemo} from "react";

const useContract = (contractAddress, abi) => {
    const { account, library } = useWeb3React();

    return useMemo(() => {
        if(!library || !contractAddress) return null;

        const provider = account ? library.getSigner(account).connectUnchecked() : library;

        return new ethers.Contract(
            contractAddress,
            abi,
            provider
        );

    }, [library, account, contractAddress, abi]);
}

export default useContract;