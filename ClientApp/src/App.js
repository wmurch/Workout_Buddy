import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home.jsx'
import { Search } from './pages/Search'
import { Build } from './pages/Build'

export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/build" component={Build} />
        <Route path="/search" component={Search} />
        <Route path="/search/exercise?={id}" component={Search} />
      </Layout>
    )
  }
}
