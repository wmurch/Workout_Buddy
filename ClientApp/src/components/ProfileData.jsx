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
import { Link } from 'react-router-dom'

export class ProfileData extends Component {
  state = {
    workouts: [],
    allWorkouts: [],
    workout: [],
    newWorkout: [],
    errorMessage: null,
    profileId: '',
    profile: [],
    isSubmitting: false
  }
  async componentDidMount() {
    var input = JSON.parse(window.localStorage.getItem('profileId'))
    await axios.get(`/api/workout/profiles?profileId=${input}`).then(resp => {
      this.setState({ workouts: resp.data, profileId: input })
    })
    await axios.get(`/api/workout/`).then(resp => {
      this.setState({ allWorkouts: resp.data })
    })
    await axios.get(`/api/profile/${input}`).then(resp => {
      this.setState({ profile: resp.data })
    })
  }

  createWorkout = async event => {
    event.preventDefault()
    await axios
      .post('/api/workout', {
        ...this.state.workout
      })
      .then(resp => {
        this.handleWorkoutSubmit()
        this.setState(
          {
            workouts: this.state.workouts.concat(this.state.workout)
          },
          () => {
            localStorage.setItem('id', JSON.stringify(resp.data.id))
          }
        )
      })
  }
  handleWorkoutSubmit = async () => {
    await axios
      .get(
        `/api//workout/new?name=${this.state.workout.name}&id=${
          this.state.profileId
        }`
      )
      .then(resp => {
        this.setState({ newWorkout: resp.data })
      })
  }

  updateWorkoutValue = async e => {
    const state = this.state
    state.workout.profileId = JSON.parse(
      window.localStorage.getItem('profileId')
    )

    state.workout[e.target.name] = e.target.value
    localStorage.setItem('workout', JSON.stringify(e.target.value))
    console.log('starting normal')
    this.setState(state)
  }
  render() {
    return (
      <div>
        <Form onSubmit={e => this.createWorkout(e)}>
          <FormGroup className="mb-3">
            <h1>Welcome</h1>
            <h4>
              This is your profile site where you create your workouts. You can
              view all of your workouts here.
            </h4>
          </FormGroup>
          <FormGroup className="mt-3">
            <h3>Build Your Workout</h3>
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
              {/* <Button
                as="input"
                type="submit"
                value="Submit"
                size="sm"
                onSubmit={this.handleWorkoutSubmit}
              >
                Test
              </Button> */}
            </Label>
          </FormGroup>
          <FormGroup name="table">
            <ListGroup>
              {this.state.workouts.map(workout => {
                return (
                  <ListGroupItem
                    key={workout.id}
                    color="light"
                    className="justify-content-between text-left text-body"
                    tag={Link}
                    to="/workout"
                  >
                    <h2>{workout.name}</h2>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default ProfileData
