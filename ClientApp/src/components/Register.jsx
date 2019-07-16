import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import axios from 'axios'

export class Register extends Component {
  state = {
    profile: [],
    profiles: [],
    isAuthenticated: false,
    password: '',
    confirmPassword: '',
    password_has_error: false
  }
  componentDidMount() {
    axios.get(`/api/profile`).then(resp => {
      this.setState({ profiles: resp.data, isAuthenticated: true })
    })
  }
  addProfile = async e => {
    e.preventDefault()
    return axios
      .post('/api/profile', { ...this.state.profile })
      .then(resp => {
        this.getProfileId()
        this.setState({
          profile: this.state.profile
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  getProfileId = async () => {
    let idLocalLength = this.state.profiles.length
    let idLocalStore = this.state.profiles[idLocalLength - 1].id + 1
    localStorage.setItem('auth', JSON.stringify(this.state.isAuthenticated))
    localStorage.setItem('profileId', JSON.stringify(idLocalStore))
    console.log(JSON.parse(window.localStorage.getItem('profileId')))
    var input = JSON.parse(window.localStorage.getItem('profileId'))
    if (input) {
      window.location.href = '/profile'
    }
  }
  checkPassword() {
    if (
      !this.state.password ||
      this.state.password !== this.state.confirmPassword
    ) {
      this.setState({ password_has_error: true })
    } else {
      this.setState({ password_has_error: false, isAuthenticated: true })
    }
  }

  updateValue = async e => {
    const state = this.state
    state.profile[e.target.name] = e.target.value

    console.log(state.profile[e.target.name])
    this.setState(state)
    if (e.target.name === 'password' || e.target.name === 'confirmPassword')
      this.checkPassword()
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  render() {
    return (
      <Form onSubmit={this.addProfile}>
        <FormGroup name="CreateProfile">
          <Label htmlFor="createInput">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={this.updateValue}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={this.updateValue}
            />
            <Input
              type="text"
              name="Email"
              placeholder="Email"
              onChange={this.updateValue}
            />
            <Input
              type="password"
              name="Password"
              placeholder="********"
              onChange={this.updateValue}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="********"
              onChange={this.updateValue}
            />

            <Button type="submit" className="btn-login">
              Submit
            </Button>
          </Label>
        </FormGroup>
      </Form>
    )
  }
}
