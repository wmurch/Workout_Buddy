import React, { Component } from 'react'
import { Form, Field } from 'react-advanced-form'
import { Link } from 'react-router-dom'

export class HomeData extends Component {
  static displayName = HomeData.name

  render() {
    return (
      <Link to="/Register">
        <button type="button">login</button>
      </Link>
    )
  }
}
