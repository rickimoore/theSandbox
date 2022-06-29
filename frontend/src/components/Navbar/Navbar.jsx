import React from "react";
import Link from "next/link";
import {ConnectButton} from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
      <div className="flex fixed top-0 left-0 justify-between w-full py-2 px-6">
          <div>
              <Link href="/">
                  <p>SNDX</p>
              </Link>
          </div>
        <ConnectButton/>
      </div>
  )
}

export default Navbar;