import React, {useEffect} from "react";
import {ConnectionContext} from "./context";
import {useCallback} from "react";
import {connectors} from "../connectors";
import {useWeb3React} from "@web3-react/core";
import {setInStorage, getKeyInStorage} from "../utils/storageManagement";
import {CACHED_WEB3_CONNECTOR, WEB3_CONNECTORS} from "../../constants";

const ConnectionProvider = ({children}) => {
    const {activate, chainId} = useWeb3React();
    const cachedWeb3Connector = getKeyInStorage(CACHED_WEB3_CONNECTOR);
    const handleError = (e) => {
        console.log(e.message)
    }

    const connect = useCallback(async () => {
        await activate(connectors.MetaMask, handleError, false);
        setInStorage(CACHED_WEB3_CONNECTOR, WEB3_CONNECTORS.METAMASK);
    }, [activate, chainId]);

    useEffect(() => {
        if(cachedWeb3Connector) {
            connect();
        }
    }, [cachedWeb3Connector]);

    const disconnect = () => {}
  return (
      <ConnectionContext.Provider value={{
          connect,
          disconnect,
      }}>
          {children}
      </ConnectionContext.Provider>
  )
}

export default ConnectionProvider;