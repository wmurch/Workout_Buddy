import React, { Component } from 'react'
import { Navbar, Button } from 'reactstrap'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home.jsx'
import { Search } from './pages/Search'
import Login from './pages/Login'
import { Build } from './pages/Build'
import { Register } from './components/Register'
import Profile from './pages/Profile'
import Logout from './components/LogoutData'
import Workout from './pages/Workout'
import './components/Layouts.css'
/* import './assets/scss/material-kit-react.scss' */

/* import ProtectedRoute from './components/ProtectedRoute' */

export default class App extends Component {
  static displayName = 'Fit Trax'
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/build" component={Build} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
          <Route path="/workout/{id}" component={Workout} />
        </Switch>
      </Layout>
    )
  }
}
