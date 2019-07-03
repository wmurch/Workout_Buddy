import React, { Component } from 'react'
import axios from 'axios'
import Autocomplete from 'react-autocomplete'

export class BuildData extends Component {
  static displayName = BuildData.name

  state = {
    workout: {},
    value: '',
    workouts: [],
    exercises: []
  }
  componentDidMount() {
    axios.get('/api/workout').then(resp => {
      this.setState({ workouts: resp.data })
    })
  }
  buildQueryResults = async e => {
    console.log('This item is logging')
  }

  addWorkout = async e => {
    e.preventDefault()
    axios
      .post('/api/workout', {
        ...this.state.workout,
        exerciseId: this.state.selectedExercise.id
      })
      .then(resp => {
        this.setState({
          workouts: this.state.workouts.concat(this.state.workout)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  getExercisesForAutoComplete(value, callback) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  }
  updateValue = async e => {
    const state = this.state
    state.workout[e.target.name] = e.target.value
    this.setState(state)
  }
  render() {
    return (
      <form onSubmit={this.addWorkout}>
        <h1>Build Your Workout</h1>
        <p>Search for an exercise for your workout</p>
        {
          <input
            type="text"
            placeholder="Name your workout"
            name="Name"
            onChange={this.updateValue}
          />
        }
        {
          <table>
            <tbody>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
              <tr>
                <td>
                  {/*  <input
                    className="exerciseId"
                    type="number"
                    placeholder="Name of exercise"
                    name="ExerciseId"
                    onChange={this.updateValue}
                  /> */}
                  <Autocomplete
                    inputProps={{ id: 'exerciseId' }}
                    value={this.state.value}
                    items={this.state.exercises}
                    getItemValue={item => item.name}
                    onSelect={(value, exercise) => {
                      console.log({ value })
                      this.setState({ value, selectedExercise: exercise })
                    }}
                    onChange={(event, value) => {
                      this.setState({ value })
                      clearTimeout(this.requestTimer)
                      console.log({ value })
                      this.requestTimer = this.getExercisesForAutoComplete(
                        value,
                        searchResults => {
                          /* console.log('cb', { searchResults }) */
                          this.setState({ exercises: searchResults })
                        }
                      )
                    }}
                    renderMenu={children => (
                      <div className="menu">{children}</div>
                    )}
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
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Sets"
                    name="Sets"
                    onChange={this.updateValue}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Reps"
                    name="Reps"
                    onChange={this.updateValue}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Weight"
                    name="Weight"
                    onChange={this.updateValue}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        }
        <button className="submitButton">Submit Workout</button>
      </form>
    )
  }
}
