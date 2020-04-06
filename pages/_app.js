import App from 'next/app'
import React from 'react'
import Router from 'next/router'
import firebase from './../lib/firebase'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import * as gtag from '../lib/gtag'
import { ThemeProvider } from 'styled-components'

const theme = {
  fonts: {
    headings: 'Arial'
  },
  colors: {
    primary: '#0070f3',
  },
}

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {
  componentDidMount () {
    firebase.auth().onAuthStateChanged( user => {
      console.log('Firebase: OnAuthStateChanged', user && user.uid)
  
      if (user) {
        // Redirect only if user is in this to pages
        if (Router.route === '/join' || Router.route === '/signin') {
          Router.push('/account')
        } else {
          console.log(Router.route, 'not redirecting to account')
        }
      } else {
        // Redirect only if user signout
        if (Router.route !== '/signin' && Router.route !== '/join') {
          Router.push('/')
        } else {
          console.log(Router.route, 'not redirecting to home')
        }
      }
    })
  }

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
