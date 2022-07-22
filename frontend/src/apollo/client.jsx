import React from "react";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import PropTypes from "prop-types";
import {CHAIN_ID, DEFAULT_CHAIN_ID} from "../../constants";

const CHAIN_SUBGRAPH_URL = {
    [CHAIN_ID.MUMBAI]: 'http://localhost:8000/subgraphs/name/thesandbox',
    [CHAIN_ID.POLYGON]: 'http://localhost:8000/subgraphs/name/thesandbox',
    [CHAIN_ID.GOERLI]: 'http://localhost:8000/subgraphs/name/thesandbox/blocksGraph'
};

const getClient = (chainId) =>
new ApolloClient({
    uri: CHAIN_SUBGRAPH_URL[chainId],
    cache: new InMemoryCache(),
});

const Provider = ({children}) => {
    const client = getClient(DEFAULT_CHAIN_ID);
    return (
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                {children}
            </ApolloHooksProvider>
        </ApolloProvider>
    );
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Provider;