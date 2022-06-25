import {useContext} from "react";
import {ConnectionContext} from "../connections/context";

const useConnectWeb3 = () => {
    return useContext(ConnectionContext);
}

export default useConnectWeb3;