import {formatUnits} from 'ethers/lib/utils';

const formatEth = (amount) => parseFloat(formatUnits(amount.toString(), 18));

export default formatEth;