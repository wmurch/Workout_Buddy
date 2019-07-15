import React, { Component } from 'react'
import { Media } from 'reactstrap'
import { LoginData } from '../components/LoginData'
import Logo from '../images/fittrax.jpg'
import './Home.css'

export class Home extends Component {
  static displayName = Home.name
  render() {
    return (
      <div>
        <Media className="home-header">
          <Media object src={Logo} alt="Generic placeholder image" />

          <Media body>
            <Media heading>
              Welcome to <span className="font-weight-bold">FitTrax</span>
            </Media>
            Welcome to the FitTrax App. This app was designed to help you track
            your workouts on mobile or while traveling.
          </Media>
        </Media>
        <LoginData />
      </div>
    )
  }
}
