import React, { Component } from 'react'
import axios from 'axios'
import {
  Highlighter,
  Menu,
  MenuItem,
  AsyncTypeahead
} from 'react-bootstrap-typeahead'

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
import '../scss/_forms.scss'
export class BuildData extends Component {
  static displayName = BuildData.name

  state = {
    allowNew: false,
    isLoading: false,
    multiple: false,
    align: 'justify',
    options: [],
    workoutId: '',
    exercise: [],
    suggestion: [],
    query: [],
    exercises: [],
    results: [],
    workouts: [],
    profileWorkout: [],
    Name: '',
    Sets: '',
    Rep: '',
    Weight: ''
  }
  _cache = {}
  /* componentDidMount = async () => {
    this.getExercises()
  } */

  createExercise = event => {
    console.log({ event })
    event.preventDefault()
    console.log(this.state.exercise)
    axios
      .post('/api/exercise', {
        ...this.state.exercise
      })
      .then(resp => {
        this.getExercises()
        this.setState({
          exercise: [],
          Name: '',
          Sets: '',
          Rep: ''
        })
        console.log({ ...this.state.exercises })
      })
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
  getExercisesForAutoComplete(e, shownResults) {
    const { query } = this.state
    const cachedQuery = this._cache[query]
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return
    }

    this.setState({ isLoading: true })
    const page = cachedQuery.page + 1
    axios.get(`/api/search/exercises?=${(query, page)}`).then(resp => {
      const options = cachedQuery.options.concat(resp.options)
      this._cache[query] = { ...cachedQuery, options, page }
      this.setState({
        isLoading: false,
        options
      })
    })
  }

  _handleSearch = query => {
    if (this._cache[query]) {
      this.setState({ options: this._cache[query].options })
      return
    }

    this.setState({ isLoading: true })
    axios.get(`/api/search/exercises?=${query}`).then(resp => {
      this._cache[query] = { ...resp, page: 1 }
      this.setState({
        isLoading: false,
        options: resp.data
      })
    })
  }
  _handleInputChange = query => {
    console.log(query)
    this.setState({ Name: query })
  }
  deleteRow = index => {
    var exercises = [...this.state.exercises]
    exercises.splice(index, 1)
    this.setState({ exercises })
  }
  updateExerciseValue = async e => {
    var id = JSON.parse(window.localStorage.getItem('id'))
    const state = this.state
    state.exercise.name = this.state.Name
    state.exercise.workoutId = id
    state.exercise[e.target.name] = e.target.value
    state[e.target.name] = e.target.value
    console.log(state)
    this.setState(state)
  }
  resetForm = () => {
    window.location.href = '/profile'
  }
  renderMenu = (option, menuProps) => {
    const exTemplate = (
      <MenuItem option={option.name} position={option.id}>
        <Highlighter search={menuProps.text}>{option.name}</Highlighter>
      </MenuItem>
    )

    return <Menu {...menuProps}>{exTemplate}</Menu>
  }

  _renderMenuItemChildren = (option, props, index) => {
    return [
      <Highlighter key="name" search={props.text}>
        {option.name}
      </Highlighter>,
      <div key="population">
        <small>Exercise: {option.name}</small>
      </div>
    ]
  }

  render() {
    const workoutName = JSON.parse(window.localStorage.getItem('workout'))
    const { align } = this.state
    return (
      <div>
        <Form onSubmit={e => this.createExercise(e)} className="mt-12">
          <h2 className="mt-3">
            <span className="font-weight-bold">{workoutName}</span>
          </h2>
          <FormGroup>
            <InputGroup>
              <Row form>
                <Col xs={6} className="mt-3">
                  <Label>
                    Exercise
                    <AsyncTypeahead
                      {...this.state}
                      id="Exercise"
                      align={align}
                      selectHintOnEnter={true}
                      allowNew={true}
                      bsSize="sm"
                      labelKey={'name'}
                      minLength={3}
                      options={this.state.options}
                      isLoading={this.state.isLoading}
                      onPaginate={this._handlePagination}
                      onSearch={this._handleSearch}
                      onInputChange={this._handleInputChange}
                      useCache={true}
                      placeholder="Enter exercise..."
                    />
                  </Label>
                </Col>
                <Col xs={3} className="mt-3">
                  <Label>
                    Sets
                    <Input
                      bsSize="sm"
                      value={this.state.Sets}
                      type="number"
                      label="Sets"
                      name="Sets"
                      onChange={this.updateExerciseValue}
                    />
                  </Label>
                </Col>
                <Col xs={3} className="mt-3">
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
                  <Button variant="primary" type="submit" size="sm">
                    Add Exercise
                  </Button>
                </Col>
              </Row>
            </InputGroup>
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
                      <td>
                        <Button onClick={i => this.deleteRow(i)} />X
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </FormGroup>
          <FormGroup>
            <Button
              size="lg"
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
