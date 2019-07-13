import { Component } from 'react'

class Logout extends Component {
  state = {
    profile: [],
    isAuthenticated: false
  }
  componentWillMount() {
    this.isAuthenticated = false
    localStorage.clear()
    window.location.href = '/profile'
  }
  render() {
    return null
  }
}

export default Logout
