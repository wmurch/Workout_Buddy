import React, { Component } from 'react'
import axios from 'axios'
import {
  Button,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Input,
  Label
} from 'reactstrap'

export class ProfileData extends Component {
  state = {
    workouts: [],
    workout: [],
    errorMessage: null,
    profileId: '',
    isSubmitting: false
  }
  componentDidMount() {
    var input = JSON.parse(window.localStorage.getItem('profileId'))
    axios.get(`/api/workout/profiles?profileId=${input}`).then(resp => {
      this.setState({ workouts: resp.data, profileId: input })
    })
  }

  createWorkout = async ({ serialized, fields, form }) => {
    console.log('is this working?')
    return axios
      .post('/api/workout', {
        ...this.state.workout
      })
      .then(resp => {
        this.handleWorkoutSubmit()
        this.setState({
          workouts: this.state.workouts.concat(this.state.workout)
        })
      })
  }

  handleWorkoutSubmit = () => {
    console.log('this is handle')
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

  updateWorkoutValue = async e => {
    const state = this.state
    state.workout.profileId = JSON.parse(
      window.localStorage.getItem('profileId')
    )
    state.workout[e.target.name] = e.target.value
    localStorage.setItem('workout', JSON.stringify(e.target.value))
    let idLocalLength = this.state.workouts.length

    let idLocalStore = this.state.workouts[idLocalLength - 1].id + 1
    localStorage.setItem('id', JSON.stringify(idLocalStore))
    console.log('starting normal')
    this.setState(state)
  }
  render() {
    /* const splitted = this.state.workout.name.split('/')
    const workoutId = splitted[splitted.length - 2]
    console.log(splitted, workoutId) */
    return (
      <Form onSubmit={this.createWorkout}>
        <FormGroup name="workout">
          <h1>Build Your Workout</h1>
          <p>Search for an exercise for your workout</p>
          <Label>
            Workout Name
            <Input
              type="text"
              name="Name"
              ref={input => (this.search = input)}
              onChange={this.updateWorkoutValue}
            />
            <Button as="input" type="submit" value="Submit" size="sm">
              Create New Workout
            </Button>
          </Label>
        </FormGroup>
        <FormGroup name="table">
          <ListGroup>
            {this.state.workouts.map(workout => {
              return (
                <ListGroupItem
                  key={workout.id}
                  color="light"
                  className="justify-content-between text-left text-primary"
                  tag="a"
                  href="/workout/{id}"
                >
                  <h2>{workout.name}</h2>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </FormGroup>
      </Form>
    )
  }
}

export default ProfileData
