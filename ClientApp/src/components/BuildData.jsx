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
    axios.get('/api/workout').then(resp => {
      this.setState({ workouts: resp.data })
    })
  }
  /*  addExerciseState = exercise => {
    this.state.exercises.push(exercise)
    this.setState({ exercises: this.state.exercises })
  }
 */
  addWorkout = ({ serialized, fields, form }) => {
    return axios
      .post('/api/workout', {
        ...this.state.workout,
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
    axios.get(`/api/workout/workout?=${this.state.query}`).then(resp => {
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
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getWorkout()
          }
        }
      }
    )
  }
  updateValue = async e => {
    const state = this.state
    state.workout[e.target.name] = e.target.value
    this.setState(state)
    console.log(state)
  }
  render() {
    const { isSubmitting } = this.state
    return (
      <div>
        <Form action={this.addWorkout} onSubmitStart={this.handleSubmitStart}>
          <Field.Group name="header">
            <h1>Build Your Workout</h1>
            <p>Search for an exercise for your workout</p>
            <Button type="submit">Submit</Button>
            {isSubmitting && <span id="submitting">Submitting...</span>}
            <label>
              Workout Name
              <input
                type="text"
                name="Name"
                ref={input => (this.search = input)}
                onChange={this.handleInputChange}
              />
            </label>
          </Field.Group>
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
              <input type="number" name="Sets" onChange={this.updateValue} />
            </label>
            <label>
              Reps
              <input
                type="number"
                label="Rep"
                name="Rep"
                onChange={this.updateValue}
              />
            </label>
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
