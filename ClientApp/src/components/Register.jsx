import React, { Component } from 'react'
import { Form, Field } from 'react-advanced-form'
import axios from 'axios'

export class Register extends Component {
  state = {
    profile: []
  }
  addProfile = e => {
    return axios
      .post('/api/profile', { ...this.state.profile })
      .then(resp => {
        this.setState({
          profile: this.state.profile
        })
      })
      .catch(err => {
        console.log(err)
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
      <Form action={this.addProfile}>
        <Field.Group name="CreateProfile">
          <label htmlFor="createInput">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={this.updateValue}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={this.updateValue}
            />
            <input
              type="text"
              name="Email"
              placeholder="Email"
              onChange={this.updateValue}
            />
          </label>
          <button type="submit" className="btn-login">
            submit
          </button>
        </Field.Group>
      </Form>
    )
  }
}
