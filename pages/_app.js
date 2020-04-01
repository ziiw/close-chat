import App from 'next/app'
import React from 'react'
import Router from 'next/router'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import * as gtag from '../lib/gtag'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider> 
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
