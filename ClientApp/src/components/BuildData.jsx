import React, { Component } from 'react'
import axios from 'axios'

export class BuildData extends Component {
  static displayName = BuildData.name

  state = {
    workouts: [],
    workout: {}
  }
  componentDidMount() {
    axios.get('/api/workout').then(resp => {
      this.setState({ workouts: resp.data })
    })
  }
  buildQueryResults() {
    console.log('This item is logging')
  }

  addWorkout() {
    axios.post('/api/workout', this.state.workout).then(resp => {
      this.setState({
        workouts: this.state.workouts.concat(this.state.workout)
      })
    })
  }
  updateValue = e => {
    const state = this.state
    state.workout[e.target.name] = e.target.value
    this.setState(state)
  }

  render() {
    return (
      <div>
        <h1>Build Your Workout</h1>
        <p>Search for an exercise for your workout</p>
        <form onSubmit={this.addWorkout}>
          <input
            type="text"
            placeholder="Name your workout"
            name="Name"
            onChange={this.updateValue}
          />
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
                  <input
                    type="text"
                    placeholder="Name of exercise"
                    name="Exercise"
                    onChange={this.updateValue}
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
          <button className="submitButton">Submit Workout</button>
        </form>
      </div>
    )
  }
}
