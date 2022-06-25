import {IPFS_GATEWAY} from "../../constants";

export const ipfsImageUrl = (imageCID) => {
    if (imageCID?.startsWith('http')) return imageCID;

    return imageCID ? `${IPFS_GATEWAY}/${imageCID.replace('ipfs://', '')}` : '';
};
