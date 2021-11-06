import React from 'react'
import ReactDOM from 'react-dom'
import ApolloProvider from './ApolloProvider'
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider />
  </React.StrictMode>,
  document.getElementById('root')
)
