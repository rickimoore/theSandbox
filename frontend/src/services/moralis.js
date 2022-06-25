import axios from "axios";
import {BASE_URL, MATIC_CONTRACT_ADDRESS} from "../../constants";


export const fetchMaticPrice = (amount) => axios.get(`${BASE_URL}/price/${MATIC_CONTRACT_ADDRESS}/${amount}`);
export const searchNfts = () => axios.get(`${BASE_URL}/nft-search`);
export const getContractTokens = (payload) => axios.post(`${BASE_URL}/get-nft-tokens`, payload);