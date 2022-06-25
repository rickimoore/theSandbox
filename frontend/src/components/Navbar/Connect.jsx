import React from "react";
import {useWeb3React} from "@web3-react/core";
import useConnectWeb3 from "../../hooks/useConnectWeb3";
import formatAddress from "../../utils/formatAddress";

const Connect = () => {
    const {active, account} = useWeb3React();
    const { connect } = useConnectWeb3();

  return active ? (
      <div className="bg-sandMedium50 p-2 rounded flex items-center space-x-2">
          <i className="bi bi-person-circle"/>
          <div>
              {formatAddress(account)}
          </div>
      </div>
  ) : (
      <button
          className="bg-red-300 disabled:bg-neutral-300 p-2 rounded text-white"
          type="button"
          onClick={connect}
      >
          Connect Wallet
      </button>
  )
}

export default Connect;