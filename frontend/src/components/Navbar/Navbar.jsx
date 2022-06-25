import React from "react";
import Connect from "./Connect";
import Link from "next/link";
import useChainConnection from "../../hooks/useChainConnection";
import Button from "../Button/Button";
import {CHAIN_NAMES, DEFAULT_CHAIN_ID} from "../../../constants";

const Navbar = () => {
    const {active, isLoading, switchNetwork, isValidChain} = useChainConnection();
  return (
      <div className="flex fixed top-0 left-0 justify-between w-full py-2 px-6">
          <div>
              <Link href="/">
                  <p>SNDX</p>
              </Link>
          </div>
          <div className="flex space-x-4">
              {
                  active && !isValidChain && (
                      <Button onClick={switchNetwork} isLoading={isLoading} className="bg-indigo-500 flex">
                          <img className="mr-2" src="/images/polygon.svg" alt=""/>
                          {`Connect to ${CHAIN_NAMES[Number(DEFAULT_CHAIN_ID)]}`}
                      </Button>
                  )
              }
              <Connect/>
          </div>
      </div>
  )
}

export default Navbar;