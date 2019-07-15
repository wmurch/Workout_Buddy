import React, { Component } from 'react'
import axios from 'axios'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
/* import { Form, Field } from 'react-advanced-form' */
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Table
} from 'reactstrap'

export class BuildData extends Component {
  static displayName = BuildData.name
  state = {
    allowNew: false,
    isLoading: false,
    multiple: false,
    options: [],
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
  /*  getExercisesForAutoComplete(e) {
    axios.get(`/api/search/exercises?=${value}`).then(resp => {
      callback(resp.data)
    })
  } */
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
    window.location.href = '/profile'
  }

  render() {
    const workoutName = JSON.parse(window.localStorage.getItem('workout'))
    return (
      <div>
        <Form onSubmit={this.createExercise}>
          <FormGroup className="autoComplete">
            <Row form>
              <InputGroup>
                <Col md={6}>
                  <h1>Welcome to the {workoutName} Page</h1>
                  <Label>
                    Exercise
                    {/* <AsyncTypeahead
                      {...this.state}
                      bsSize="sm"
                      labelKey="loginexercise"
                      minLength={3}
                      onSearch={this._handleSearch}
                      placeholder="Enter your exercise..."
                    /> */}
                  </Label>
                </Col>
                <Col xs={2}>
                  <Label>
                    Sets
                    <Input
                      bsSize="sm"
                      value={this.state.Sets}
                      className=".col-large-*"
                      type="number"
                      label="Sets"
                      name="Sets"
                      onChange={this.updateExerciseValue}
                    />
                  </Label>
                </Col>
                <Col xs={2}>
                  <Label>
                    Reps
                    <Input
                      bsSize="sm"
                      value={this.state.Rep}
                      type="number"
                      label="Rep"
                      name="Rep"
                      onChange={this.updateExerciseValue}
                    />
                  </Label>
                </Col>
              </InputGroup>
            </Row>
          </FormGroup>
          <FormGroup className="woInput" />
          <FormGroup name="table">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sets</th>
                  <th>Reps</th>
                </tr>
              </thead>
              <tbody>
                {this.state.exercises.map(exercise => {
                  return (
                    <tr key={exercise.id}>
                      <td>{exercise.name}</td>
                      <td>{exercise.sets}</td>
                      <td>{exercise.rep}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </FormGroup>
          <FormGroup>
            <Button variant="primary" type="submit" size="lg">
              Add Exercise
            </Button>
            <Button
              as="input"
              type="reset"
              value="reset"
              onClick={this.resetForm}
            >
              Done
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
