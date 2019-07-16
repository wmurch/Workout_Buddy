import React, { Component } from 'react'
import { Media } from 'reactstrap'
import { Login } from './Login'
import Logo from '../images/fittrax.jpg'
import './Home.css'

export class Home extends Component {
  static displayName = Home.name
  render() {
    return (
      <div>
        <Media className="home-header">
          <Media body>
            <Media heading>
              <Media object src={Logo} alt="Generic placeholder image" />
            </Media>
            <h2>
              <span className="font-weight-bold">FitTrax</span>
            </h2>

            <h3>
              Welcome. This app was designed to help you track your workouts on
              mobile or while traveling.
            </h3>
          </Media>
        </Media>
        <Login />
      </div>
    )
  }
}
