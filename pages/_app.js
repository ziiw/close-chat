import App from 'next/app'
import React from 'react'
import Router from 'next/router'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import * as gtag from '../lib/gtag'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  fonts: {
    headings: 'Arial'
  },
  colors: {
    primary: '#0070f3',
    background: '#FFC57A'
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial;
    fnot-size: 14px;
  }
`

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider> 
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
