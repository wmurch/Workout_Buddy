import React, { Component } from 'react'
import { Form, Field } from 'react-advanced-form'
/* import { Redirect } from 'react-router'; */
import axios from 'axios'

export class LoginData extends Component {
  state = {
    profile: [],
    isAuthenticated: false
  }
  getProfile = async () => {
    console.log(this.state.profile.email)
    return axios
      .get(`/api/profile/login?email=${this.state.profile.email}`)
      .then(resp => {
        this.setState({ profile: resp.data, isAuthenticated: true })
      })
      .then(data => {
        const { auth, profile } = this.state
        localStorage.setItem('auth', JSON.stringify(this.state.isAuthenticated))
        localStorage.setItem('profile', JSON.stringify(this.state.profile))
        /* console.log(JSON.parse(window.localStorage.getItem('profileId'))) */
        window.location.href = '/profile'
      })
  }
  updateValue = async e => {
    const state = this.state
    state.profile[e.target.name] = e.target.value
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
