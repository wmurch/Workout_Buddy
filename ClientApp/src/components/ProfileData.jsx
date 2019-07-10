import React, { Component } from 'react'
import axios from 'axios'
import { Form, Field } from 'react-advanced-form'
import Button from './Button'

class ProfileData extends Component {
  state = {
    workouts: [],
    workout: [],
    errorMessage: null,
    profileId: '',
    isSubmitting: false
  }
  componentDidMount() {
    var input = JSON.parse(window.localStorage.getItem('profile'))
    this.setState({ profileId: input[0].id })
    axios.get(`/api/workout?profileId=${input[0].id}`).then(resp => {
      this.setState({ workout: resp.data })
    })
  }
  createWorkout = ({ serialized, fields, form }) => {
    return axios
      .post('/api/workout', {
        ...this.state.workout
      })
      .then(resp => {
        this.setState({
          workout: this.state.workout.concat(this.state.workout)
        })
        localStorage.setItem('workout', JSON.stringify(this.state.workout))
        window.location.href = `/build/${this.state.profileId}`
        console.log(this.state.workout)
      })
  }

  handleWorkoutSubmit = () => {
    this.setState({ isSubmitting: true })
  }
  updateWorkoutValue = async e => {
    var input = JSON.parse(window.localStorage.getItem('profile'))
    const state = this.state
    state.workout.profileId = input[0].id
    state.workout[e.target.name] = e.target.value
    this.setState(state)
    console.log(state)
  }
  render() {
    return (
      <Form
        action={this.createWorkout}
        onSubmitStart={this.handleWorkoutSubmit}
      >
        <Field.Group name="workout">
          <h1>Build Your Workout</h1>
          <p>Search for an exercise for your workout</p>
          <label>
            Workout Name
            <input
              type="text"
              name="Name"
              ref={input => (this.search = input)}
              onChange={this.updateWorkoutValue}
            />
            <Button type="submitWorkout">Create New Workout</Button>
          </label>
        </Field.Group>
      </Form>
    )
  }
}

export default ProfileData
