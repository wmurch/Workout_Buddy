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
    profileWorkout: []
  }
  componentDidMount() {
    const searchId = JSON.parse(window.localStorage.getItem('id'))
    if (!isNaN(parseInt(searchId))) {
      axios.get(`/api/exercise/workout/${searchId}`).then(data => {
        console.log({ data })
        if (data.status === 200) {
          this.setState({ profileWorkout: data.data })
        }
      })
    }
  }

  createExercise = ({ serialized, fields, form }) => {
    console.log(this.state.exercise)
    return axios
      .post('/api/exercise', {
        ...this.state.exercise
      })
      .then(resp => {
        this.setState({
          exercises: this.state.exercise.concat(this.state.exercise)
        })
        console.log(this.state.exercises)
      })
  }

  getExercisesForAutoComplete(value, callback) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  }
  updateExerciseValue = async e => {
    var id = JSON.parse(window.localStorage.getItem('id'))
    console.log(this.state.selectedExercise)
    const state = this.state
    state.exercise.workoutId = id
    state.exercise.name = this.state.selectedExercise.name
    state.exercise[e.target.name] = e.target.value
    this.setState(state)
    console.log(state)
  }
  exerciseList = () => {
    const yourWorkout = this.state.profileWorkout.map
    const listItems = yourWorkout.map(exercise => (
      <li key={exercise.id.toString()}>{exercise}</li>
    ))
    return <ul>{listItems}</ul>
  }
  render() {
    const workoutName = JSON.parse(window.localStorage.getItem('workout'))
    return (
      <div>
        <Form
          action={this.createExercise}
          onSubmitStart={this.handleExerciseSubmit}
        >
          <Field.Group name="body">
            <h1>Welcome to the {workoutName} Page</h1>
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
            </label>
            <label>
              Weight
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
            {/* <ul className="listGroup">
                {this.state.profileWorkout.map(exercise => ({ return(

                  <li className="list-group-item list-group-item-primary">
                  exercise.toString() }))}
              </li>
                )
                  
            </ul> */}
            <p>{this.state.profileWorkout.toString()}</p>
          </Field.Group>
        </Form>
      </div>
    )
  }
}
