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
    axios.get(`/api/workout`).then(resp => {
      this.setState({ workouts: resp.data })
    })
  }

  createWorkout = ({ serialized, fields, form }) => {
    return axios
      .post('/api/workout', {
        ...this.state.workout
      })
      .then(resp => {
        this.setState({
          workouts: this.state.workouts.concat(this.state.workout)
        })
        window.location.href = '/build'
      })
  }

  /* handleWorkoutSubmit = () => {
    axios
      .get(
        `/api//workout/new?name=${this.state.workout.name}&id=${
          this.state.profileId
        }`
      )
      .then(resp => {
        this.setState({ newWorkout: resp.data })
      })
      .then(data => {
        console.log(this.state.workout)
        localStorage.setItem('workout', JSON.stringify(this.state.newWorkout))
        window.location.href = `/build/${this.state.profileId}`
      })
  }
 */
  updateWorkoutValue = async e => {
    var input = JSON.parse(window.localStorage.getItem('profile'))
    const state = this.state
    this.state.workout.profileId = input[0].id
    state.workout[e.target.name] = e.target.value
    localStorage.setItem('workout', JSON.stringify(e.target.value))
    let idLocalLength = this.state.workouts.length
    let idLocalStore = this.state.workouts[idLocalLength - 1].id + 1
    console.log(idLocalLength)
    localStorage.setItem('id', JSON.stringify(idLocalStore))
    console.log(idLocalStore)
    /* localStorage.setItem(
      'id',
      JSON.stringify(this.state.workouts[this.state.workouts.length - 1] + 1)
    ) */
    this.setState(state)
  }
  render() {
    return (
      <Form action={this.createWorkout}>
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
