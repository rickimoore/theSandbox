import React, {useState} from 'react';
import useAuctionContract from '../../hooks/useAuctionContract';
import PropTypes from 'prop-types';
import {CHAIN_PARAMS, DEFAULT_CHAIN_ID} from '../../../constants';
import formatAddress from '../../utils/formatAddress';
import useCalculatedGasFees from '../../hooks/useCalculatedGasFees';

const ClaimAuction = ({auctionId}) => {
  const instance = useAuctionContract();
  const [isLoading, setLoading] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);
  const [txHash, setHash] = useState('');
  const { calculateGasFee } = useCalculatedGasFees();

  const claimAuction = async () => {
    setLoading(true);
    const gasFees = await calculateGasFee();
    const tx = await instance?.claimAuction(auctionId, gasFees).catch((e) => {
      console.log(e)
      setLoading(false);
    });

    setLoading(false);
    if(!tx) return;

    setHash(tx.hash);

    const res = await tx.wait();

    if(res) {
      setConfirmed(true);
    }
  }


  return txHash ? (
      <div className="w-full border-sandDark border-2 p-4 flex justify-between">
        <p>{isConfirmed ? 'Confirmed tx: ' : 'Pending tx: '} <strong>{formatAddress(txHash)}</strong></p>

        <a rel="noopener noreferrer" target="_blank" href={`${CHAIN_PARAMS[DEFAULT_CHAIN_ID].blockExplorerUrls[0]}/tx/${txHash}`}>
          <i className="bi bi-box-arrow-up-right"/>
        </a>
      </div>
  ) : (
      <button disabled={isLoading} onClick={claimAuction} className="w-full cursor-pointer p-4 disabled:opacity-50 disabled:pointer-events-none bg-midnight hover:bg-midnightMedium text-white">
        {isLoading ? 'Claiming...' : 'Claim Auction'}
      </button>
  )
}


ClaimAuction.propTypes = {
  auctionId: PropTypes.number.isRequired,
}

export default ClaimAuction;