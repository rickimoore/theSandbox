import {useContract, useProvider, useSigner} from 'wagmi';

const useConnectContract = (contractAddress, abi) => {
    const { data: signer } = useSigner();
    const provider = useProvider();

    return useContract({
        addressOrName: contractAddress,
        contractInterface: abi,
        signerOrProvider: signer || provider,
    })
}

export default useConnectContract;