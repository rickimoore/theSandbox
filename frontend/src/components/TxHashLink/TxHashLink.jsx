import {CHAIN_PARAMS, DEFAULT_CHAIN_ID} from '../../../constants';
import React from 'react';
import PropTypes from 'prop-types';

const TxHashLink = ({hash}) => {
  return (
      <a rel="noopener noreferrer" target="_blank" href={`${CHAIN_PARAMS[DEFAULT_CHAIN_ID].blockExplorerUrls[0]}/tx/${hash}`}>
        <i className="bi bi-box-arrow-up-right"/>
      </a>
  )
}

TxHashLink.propTypes = {
  hash: PropTypes.string.isRequired,
}

export default TxHashLink;