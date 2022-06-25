// pages/_app.js
import React from "react";
import '../styles/styles.css'
import {Web3ReactProvider} from "@web3-react/core";
import {connectors} from "../connectors";
import getLibrary from "../utils/getLibrary";
import ApolloProvider from '../apollo/client';
import ConnectionProvider from "../connections/provider";

export default function MyApp({ Component, pageProps }) {
    return (
        <Web3ReactProvider connectors={connectors} getLibrary={getLibrary}>
            <ApolloProvider>
                <ConnectionProvider>
                    <Component {...pageProps} />
                </ConnectionProvider>
            </ApolloProvider>
        </Web3ReactProvider>
    )
}