import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import Router from 'next/router'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import * as gtag from '../lib/gtag'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  fonts: {
    headings: {
      family: 'Product Sans Bold'
    }
  },
  colors: {
    primary: '#0070f3',
    lightBlue: '#D9DCE8',
    darkBlue: '#2D3543',
    background: '#FFC57A'
  },
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial;
    fnot-size: 14px;
  }
`

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Close = props => {
  const { Component, pageProps, reduxStore } = props
  
  return (
    <>
      <Head>
        <title>💬 Close</title>
      </Head>
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider> 
      </Provider>
    </>
  )
}

export default withReduxStore(Close)
