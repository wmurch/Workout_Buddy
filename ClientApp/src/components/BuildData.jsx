import React, { Component } from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'
import { Form, Field } from 'react-advanced-form'
import Button from './Button'
import Suggestions from './Suggestions'

export class BuildData extends Component {
  static displayName = BuildData.name
  state = {
    query: '',
    profileId: '',
    searchTerm: '',
    workout: [],
    value: '',
    exercises: [],
    items: [],
    selectedExercise: {},
    workouts: [],
    isSubmitting: false,
    results: []
  }

  componentDidMount() {
    /* var input = JSON.parse(window.localStorage.getItem('profile'))
    this.setState({ profileId: input[0].id }) */
    axios.get('/api/workout').then(resp => {
      this.setState({ workouts: resp.data })
    })
  }
  /*  addExerciseState = exercise => {
    this.state.exercises.push(exercise)
    this.setState({ exercises: this.state.exercises })
  }
 */
  createWorkout = ({ serialized, fields, form }) => {
    return axios
      .post('/api/workout', {
        ...this.state.workout
      })
      .then(resp => {
        this.setState({
          workout: this.state.workout.concat(this.state.workout)
        })
        console.log(this.state.workout)
      })
  }
  addExercise = ({ serialized, fields, form }) => {
    return axios
      .post('/api/workout', {
        ...this.state.workout,
        ProfileId: this.state.profileId,
        exerciseId: this.state.selectedExercise.id
      })
      .then(resp => {
        this.setState({
          workout: this.state.workout.concat(this.state.workout)
        })
        console.log(this.state.workout)
      })
      .catch(err => {
        console.log(err)
      })
  }
  getWorkout = () => {
    axios.get(`/api/workout/workout?id=${this.state.query}`).then(resp => {
      this.setState({ results: resp.data })
      console.log(resp.data)
    })
  }
  getExercisesForAutoComplete(value, callback) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  }

  handleSubmitStart = () => {
    this.setState({ isSubmitting: true })
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
  updateExerciseValue = async e => {
    const state = this.state
    state.exercise[e.target.name] = e.target.value
    this.setState(state)
    console.log(state)
  }
  render() {
    const { isSubmitting } = this.state
    return (
      <div>
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
              {isSubmitting && <span id="submitting">Submitting...</span>}
            </label>
          </Field.Group>
        </Form>
        <Form
          action={this.createExercise}
          onSubmitStart={this.handleExerciseSubmit}
        >
          <Field.Group name="body">
            <label>
              Exercise
              <Autocomplete
                inputProps={{ id: 'exerciseId' }}
                value={this.state.value}
                items={this.state.exercises}
                getItemValue={item => item.name}
                onSelect={(value, exercise) => {
                  console.log({ exercise })
                  this.setState({ value, selectedExercise: exercise })
                }}
                onChange={(event, value) => {
                  this.setState({ value })
                  clearTimeout(this.requestTimer)
                  console.log({ value })
                  this.requestTimer = this.getExercisesForAutoComplete(
                    value,
                    searchResults => {
                      console.log('cb', { searchResults })
                      this.setState({ exercises: searchResults })
                    }
                  )
                }}
                renderMenu={children => <div className="menu">{children}</div>}
                renderItem={(item, isHighlighted) => (
                  <div
                    className={`item ${
                      isHighlighted ? 'item-highlighted' : ''
                    }`}
                    key={item.id}
                  >
                    {item.name}
                  </div>
                )}
              />
            </label>
            <label>
              Sets
              <input
                type="number"
                name="Sets"
                onChange={this.updateExerciseValue}
              />
            </label>
            <label>
              Reps
              <input
                type="number"
                label="Rep"
                name="Rep"
                onChange={this.updateExerciseValue}
              />
            </label>
            <Button type="submitExercise">Add Exercise</Button>
            {isSubmitting && <span id="submitting">Submitting...</span>}
          </Field.Group>
          <Field.Group name="table">
            <ul>
              <Suggestions results={this.state.results} />
            </ul>
          </Field.Group>
        </Form>
      </div>
    )
  }
}
