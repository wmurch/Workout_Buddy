import React, { Component } from 'react'
import axios from 'axios'

class WorkoutData extends Component {
  state = {
    workout: [],
    exercises: []
  }
  componentDidMount() {
    const workoutId = this.props.match.params.id

    if (!isNaN(parseInt(workoutId))) {
      axios
        .get(`/api/workout/${workoutId}`)
        .then(resp => {
          console.log({ resp })
          if (resp.status === 200) {
            this.setState({
              workout: resp.data
            })
          } else {
            this.setState({
              errorMessage: 'API is down, go for walk.'
            })
          }
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message
          })
        })
    } else {
      this.setState({
        errorMessage: 'That is not a workout id, try again'
      })
    }
  }

  render() {
    return this.state.workout
  }
}

export default WorkoutData
