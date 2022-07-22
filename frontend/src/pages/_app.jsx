// pages/_app.js
import React from "react";
import '../styles/styles.css'
import ApolloProvider from '../apollo/client';
import '@rainbow-me/rainbowkit/styles.css';
import "antd/dist/antd.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
    [chain.goerli],
    [
      alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
      publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
  appName: 'TheSandbox',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <ApolloProvider>
              <Component {...pageProps} />
            </ApolloProvider>
          </RainbowKitProvider>
        </WagmiConfig>
    )
}