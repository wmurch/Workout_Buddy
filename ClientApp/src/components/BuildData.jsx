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
    items: [],
    selectedExercise: {},
    results: [],
    workouts: [],
    profileWorkout: [],
    isDirty: false
  }
  componentDidMount = async () => {
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
        this.setState({
          profileWorkout: this.state.exercise.concat(this.state.exercise)
        })
        console.log({ ...this.state.profileWorkout })
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
    this.setState(state)
  }
  resetForm = () => {
    window.form.reset()
  }

  handleReset = () => {
    this.setState(this.state)
    this.setState({ value: '' })
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
          <Field.Group name="body">
            <h1>Welcome to the {workoutName} Page</h1>
            <label>
              Exercise
              <Autocomplete
                inputProps={{
                  id: 'exerciseId'
                }}
                value={this.state.value}
                items={this.state.exercises}
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
            </label>
            <Button id="reset" type="reset" onClick={this.resetForm}>
              Add Exercise
            </Button>
          </Field.Group>
          <Field.Group name="table">
            <ul className="list-unstyled">
              {this.state.exercises.map(exercise => {
                return (
                  <li key={exercise.id}>
                    <p>{exercise.name}</p>
                    <p>{exercise.sets}</p>

                    <p>{exercise.rep}</p>
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
