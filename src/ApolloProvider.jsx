import React from "react"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client"
import { setContext } from '@apollo/client/link/context'
import { createHttpLink } from '@apollo/client/link/http'

import App from "./App"

const httpLink = createHttpLink({
    //'http://localhost:4000/graphql'
    uri: 'https://sleepy-mesa-18665.herokuapp.com/graphql'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')

    return {
        headers: {
            Authorization: token ? 'Bearer ' + token : '',
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

const Provider = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

export default Provider