import React, { Component } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-advanced-form'
import { Link } from 'react-router-dom'

class ProfileData extends Component {
  state = {
    workouts: [],
    errorMessage: null,
    profileId: ''
  }
  componentDidMount() {
    var input = JSON.parse(window.localStorage.getItem('profile'))
    this.setState({ profileId: input[0].id })
    axios.get(`/api/workout?profileId=${input[0].id}`).then(resp => {
      this.setState({ workouts: resp.data })
    })
  }
  handleBuildSubmit = () => {}

  render() {
    return (
      <Form onSubmitStart={this.handleBuildSubmit}>
        <Field.Group>
          <p>Build a new workout</p>

          <Link to={`/build/${this.state.profileId}`}>
            <button type="button">Build workout</button>
          </Link>
        </Field.Group>
      </Form>
    )
  }
}

export default ProfileData
