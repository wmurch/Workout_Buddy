import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Media
} from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        localStorage.setItem('auth', JSON.stringify(this.state.isAuthenticated))
        localStorage.setItem(
          'profileId',
          JSON.stringify(this.state.profile[0].id)
        )

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
        <Form className="login-form" onSubmit={this.getProfile}>
          <FormGroup>
            <Label htmlFor="emailLogin">
              <Input
                type="text"
                name="email"
                placeholder="Email"
                onChange={this.updateValue}
              />
            </Label>
            <FormText color="muted">
              If you do not have an account please register here:
              <Link to="/register"> Register</Link>
            </FormText>
            <Button type="submit" className="btn btn-primary">
              submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
