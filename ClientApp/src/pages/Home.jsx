import React, { Component } from 'react'
import { Form, Field } from 'react-advanced-form'
import { Link } from 'react-router-dom'

export class Home extends Component {
  static displayName = Home.name
  render() {
    return (
      <Form>
        <h1>Welcome to Fit Trax</h1>
        <Field.Group>
          <p>If you do not have an account create one below</p>
          <Link to="/register">
            <button type="button">Create an Account</button>
          </Link>
        </Field.Group>
        <Field.Group>
          <p>If you have an account go ahead and log in</p>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </Field.Group>
      </Form>
    )
  }
}
