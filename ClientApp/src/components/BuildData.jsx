import React, { Component } from 'react'
import axios from 'axios'
//import Autocomplete from 'react-autocomplete'
import DataTable from './DataTable'

export class BuildData extends Component {
  static displayName = BuildData.name

  state = {
    workout: {},
    workouts: []
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
  handleRowDel(exercise) {
    var index = this.state.products.indexOf(exercise)
    this.state.exercises.splice(index, 1)
    this.setState(this.state.exercises)
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
        <button className="submitButton">Submit Workout</button>
        {
          <input
            type="text"
            placeholder="Name your workout"
            name="Name"
            onChange={this.updateValue}
          />
        }
        <table>
          <tbody>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Delete</th>
            </tr>
            <tr className="eachRow">
              <DataTable />
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          onClick={this.props.onRowAdd}
          className="btn btn-success pull-right"
        >
          Add
        </button>
      </form>
    )
  }
}
