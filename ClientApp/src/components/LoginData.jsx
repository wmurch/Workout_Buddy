import React, { Component } from 'react'
import { Form, Field } from 'react-advanced-form'
/* import { Redirect } from 'react-router'; */
import axios from 'axios'

export class LoginData extends Component {
  state = {
    profile: {},
    isAuthenticated: false
  }
  componentDidMount() {
    axios.get('/api/workout').then(resp => {
      this.setState({ profile: resp.data })
    })
  }
  getProfile = async () => {
    return axios
      .get(`/api/profile?email=${this.state.profile.email}`)
      .then(resp => {
        this.setState({ profile: resp.data, isAuthenticated: true })
      })
      .then(data => {
        const { auth, profile } = this.state
        localStorage.setItem('auth', JSON.stringify(this.state.isAuthenticated))
        localStorage.setItem('profile', JSON.stringify(this.state.profile.id))
        console.log(JSON.stringify(this.state.profile.id))
        window.location.href = '/profile'
      })
  }
  updateValue = async e => {
    const state = this.state
    state.profile[e.target.name] = e.target.value
    console.log(state.profile[e.target.name])
    this.setState(state)
  }
  render() {
    return (
      <div>
        <Form action={this.getProfile} onSubmitStart={this.getProfile}>
          <Field.Group>
            <label htmlFor="emailLogin">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.updateValue}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </Field.Group>
        </Form>
      </div>
    )
  }
}
