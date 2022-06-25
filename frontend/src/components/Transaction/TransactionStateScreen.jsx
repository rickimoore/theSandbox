import Player from 'lottie-react';
import formatAddress from '../../utils/formatAddress';
import TxHashLink from '../TxHashLink/TxHashLink';
import React from 'react';
import PendingAnim from '../../assets/takebid.json';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const TransactionStateScreen = ({options = {
  loop: true,
  autoplay: true,
  animationData: PendingAnim,
  },
    txHash,
    isComplete,
    redirectCta,
    redirectDestination
                                }) => {

  return (
      <div className="max-w-sm">
        <Player
            className="wrapper__animation"
            {...options}
        />
        <div className="mt-6">
          <p>{isComplete ? 'Transaction Complete' : 'Confirming Transaction'}</p>
          <div className="w-full mt-6 border-sandMedium50 border-2 p-4 flex justify-between">
            <p>{formatAddress(txHash)}</p>
            <TxHashLink hash={txHash}/>
          </div>
          {
            isComplete && redirectCta && redirectDestination && (
                <div className="w-full mt-6 flex items-center justify-center">
                  <Button href={redirectDestination}>{redirectCta}</Button>
                </div>
            )
          }
        </div>
      </div>
  )
}

TransactionStateScreen.propTypes = {
  options: PropTypes.shape({
    loop: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    animationData: PropTypes.any,
  }),
  redirectCta: PropTypes.string,
  redirectDestination: PropTypes.string,
  txHash: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
}

export default TransactionStateScreen;