import React, { Component } from 'react'
import axios from 'axios'

class ProfileData extends Component {
  componentDidMount() {
    axios.get('/api/workout').then(resp => {
      this.setState({ workouts: resp.data })
    })
    var auth = localStorage.getItem('auth') === 'true'
    var profile = auth ? localStorage.getItem('profile') : ''
    this.setState({ auth, profile })
    console.log({ auth, profile })
  }
  render() {
    return (
      <div>
        <p>This is the profile data page</p>
      </div>
    )
  }
}

export default ProfileData
