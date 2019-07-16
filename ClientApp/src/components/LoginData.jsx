import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class LoginData extends Component {
  state = {
    email: '',
    password: '',
    profile: [],
    isAuthenticated: false
  }
  async componentDidMount() {
    await axios
      .get(`/api/profile/login?email=${this.state.profile.email}`)
      .then(resp => {
        this.setState({ profile: resp.data, isAuthenticated: true })
      })
  }
  getProfile = async e => {
    console.log(this.state.profile.email)
    return axios
      .get(`/api/profile/login?email=${this.state.profile.email}`)
      .then(resp => {
        this.setState({ profile: resp.data, isAuthenticated: true })
      })
      .then(data => {
        localStorage.setItem('auth', JSON.stringify(this.state.isAuthenticated))
        localStorage.setItem(
          'profileId',
          JSON.stringify(this.state.profile[0].id)
        )
        localStorage.setItem('profile', JSON.stringify(this.state.profile))

        window.location.href = '/profile'
        /* this.props.history.push('/profile') */
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
        <Form className="login-form" onSubmit={this.getProfile}>
          <FormGroup>
            <Label for="emailLogin">
              <Input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.updateValue}
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="passwordLogin">
              <Input
                type="password"
                name="Password"
                placeholder="********"
                onChange={this.updateValue}
              />
            </Label>
          </FormGroup>
          <FormText color="muted">
            <h3>
              If you do not have an account please
              <Link to="/register">
                <span className="font-weight-bolder"> Register</span>{' '}
              </Link>
            </h3>
          </FormText>
          <Button type="submit" className="btn btn-primary">
            submit
          </Button>
        </Form>
      </div>
    )
  }
}
