import React, { Component } from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'
import { Form, Field } from 'react-advanced-form'

import Button from './Button'

export class BuildData extends Component {
  static displayName = BuildData.name
  state = {
    workoutId: '',
    exercise: [],
    value: '',
    query: '',
    exercises: [],
    suggestions: [],
    items: [],
    selectedExercise: {},
    results: [],
    workouts: [],
    profileWorkout: [],
    Sets: '',
    Rep: '',
    Weight: '',
    isDirty: false
  }
  componentDidMount = async () => {
    this.getExercises()
  }

  getExercises = async () => {
    const searchId = JSON.parse(window.localStorage.getItem('id'))
    if (!isNaN(parseInt(searchId))) {
      await axios.get(`/api/exercise/workout/${searchId}`).then(data => {
        if (data.status === 200) {
          this.setState({ exercises: data.data })
        }
      })
      console.log(this.state.exercises)
    }
  }

  createExercise = async ({ serialized, fields, form }) => {
    console.log(this.state.exercise)
    return axios
      .post('/api/exercise', {
        ...this.state.exercise
      })
      .then(resp => {
        this.getExercises()
        this.setState({
          exercise: [],
          Sets: '',
          Rep: '',
          Weight: '',
          value: ''
        })
        console.log({ ...this.state.exercises })
      })
  }
  getExercisesForAutoComplete(value, callback) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  }
  updateExerciseValue = async e => {
    var id = JSON.parse(window.localStorage.getItem('id'))
    console.log(id)
    const state = this.state
    state.exercise.workoutId = id
    state.exercise.name = this.state.selectedExercise.name
    state.exercise[e.target.name] = e.target.value
    state[e.target.name] = e.target.value
    console.log(state)
    this.setState(state)
  }
  resetForm = () => {
    window.form.reset()
  }

  handleReset = () => {
    this.setState(this.state)
    /*  this.setState({ value: '' }) */
  }

  handleFirstChange = () => {
    this.setState({
      isDirty: true
    })
  }
  render() {
    const workoutName = JSON.parse(window.localStorage.getItem('workout'))
    return (
      <div>
        <Form
          action={this.createExercise}
          ref={form => (window.form = form)}
          onReset={this.handleReset}
          onFirstChange={this.handleFirstChange}
        >
          <Button type="submit">Add Exercise</Button>
          <Field.Group name="body">
            <h1>Welcome to the {workoutName} Page</h1>
            <label>
              Exercise
              <Autocomplete
                inputProps={{
                  id: 'exerciseId'
                }}
                value={this.state.value}
                items={this.state.suggestions}
                getItemValue={item => item.name}
                onSelect={(value, exercise) => {
                  this.setState({ value, selectedExercise: exercise })
                }}
                onChange={(event, value) => {
                  this.setState({ value })
                  clearTimeout(this.requestTimer)
                  this.requestTimer = this.getExercisesForAutoComplete(
                    value,
                    searchResults => {
                      this.setState({ suggestions: searchResults })
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
                value={this.state.Sets}
                className=".col-large-*"
                type="number"
                label="Sets"
                name="Sets"
                onChange={this.updateExerciseValue}
              />
            </label>
            <label>
              Reps
              <input
                value={this.state.Rep}
                type="number"
                label="Rep"
                name="Rep"
                onChange={this.updateExerciseValue}
              />
            </label>
            <label>
              Weight
              <input
                value={this.state.Weight}
                type="number"
                label="Weight"
                name="Weight"
                onChange={this.updateExerciseValue}
              />
            </label>
          </Field.Group>
          <Field.Group name="table">
            <ul className="list-unstyled">
              {this.state.exercises.map(exercise => {
                return (
                  <li key={exercise.id}>
                    <p>{exercise.name}</p>
                    <p>{exercise.sets}</p>
                    <p>{exercise.rep}</p>
                    <p>{exercise.weight}</p>
                  </li>
                )
              })}
            </ul>
          </Field.Group>
        </Form>
      </div>
    )
  }
}
