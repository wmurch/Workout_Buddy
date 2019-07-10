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
    workoutId: '',
    searchTerm: '',
    workoutDisabled: false,
    exerciseDisabled: true,
    workout: [],
    value: '',
    exercises: [],
    items: [],
    selectedExercise: {},
    workouts: [],

    results: []
  }

  componentDidMount() {
    var input = JSON.parse(window.localStorage.getItem('workout'))
    this.setState({ workout: input[0].name, workoutId: input[0].id })
    axios.get('/api/workout').then(resp => {
      this.setState({ workouts: resp.data })
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

  updateExerciseValue = async e => {
    const state = this.state
    state.exercise[e.target.name] = e.target.value
    this.setState(state)
    console.log(state)
  }
  render() {
    return (
      <div>
        <Form
          action={this.createExercise}
          onSubmitStart={this.handleExerciseSubmit}
        >
          <Field.Group name="body">
            <h1>Welcome to the {this.state.workout} Page</h1>
            <label>
              Exercise
              <Autocomplete
                inputProps={{
                  id: 'exerciseId',
                  ...this.state.exerciseDisabled
                }}
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
                label="Sets"
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
              <input
                type="number"
                label="Weight"
                name="Weight"
                onChange={this.updateExerciseValue}
              />
            </label>
            <Button type="submitExercise">Add Exercise</Button>
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
